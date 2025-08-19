import { generateId } from "../utils/utils.js"
import { Player } from "./player.js"
import Room from "./room.js"
import { GameMap } from "./map.js";

//* Server class : handles websocket game server
//* - handle players ( remove and add to rooms )
//* - handle rooms ( create and delete rooms if empty )
export default class Server {
    constructor(wss) {
        this.server = wss
        this.players = new Map() // [playerId, {player: new Player(), roomId: RoomId} ]
        this.rooms = new Map() // [groupId, Room]
        this.Map = new GameMap({}, 15) // Initialize the game map with size 15
        this.board = this.Map.generateWalls() // Generate walls on the map
        wss.on("connection", ws => {
            console.log(this.board, "board");
            this.handleConnection(ws)
        })
    }

    handleConnection(ws) {
        let playerId = generateId("P")

        ws.on("close", () => {
            console.log("Client disconnected")
            this.handleDisconnection(playerId)
        })

        ws.on("message", (message) => {
            const parsed = JSON.parse(message);
            console.log(parsed, "message");
            const { type, data } = parsed;
            console.log(type, "=====> ", data)
            switch (type) {
                case "setName":
                    this.handlePlayer(ws, data.name, playerId)
                    break
                case "getGameUpdates":
                    this.handleGamesUpdates(playerId, data)
                    break
                default:
                    break
            }
        })

    }

    handlePlayer(ws, playerName, playerId) {
        let emptyRooms = [...this.rooms.values()].filter(room => room.isEmpty() && !room.isClosed)
        let newPlayer = new Player(this, ws, playerId)
        if (emptyRooms.length === 0) {
            let roomId = generateId("R")
            let newRoom = new Room(roomId, this)
            this.rooms.set(roomId, newRoom)
            this.players.set(playerId, { player: newPlayer, roomId })
            newRoom.addPlayer(playerId, playerName, newPlayer)
            return
        }
        let roomCanJoin = emptyRooms.find(room => room.isValidName(playerName))
        if (roomCanJoin) {
            this.players.set(playerId, { player: newPlayer, roomId: roomCanJoin.id })
            roomCanJoin.addPlayer(playerId, playerName, newPlayer)
        } else if (!roomCanJoin) {
            let message = { type: "nameEntry", data: { error: "userName already exists" } }
            ws.send(JSON.stringify(message))
        }

    }

    handleDisconnection(playerId) {
        let room = this.getPlayerRoom(playerId)

        if (room) {
            room.removePlayer(playerId)
            if (room.players.size === 0) {
                this.rooms.delete(room.id)
            }
        }

        this.players.delete(playerId)

        console.log("Remaining roooms: ", this.rooms.size)
    }


    getPlayerRoom(playerId) {
        let playerData = this.players.get(playerId)
        if (!playerData) return null
        let { roomId } = playerData

        let room = this.rooms.get(roomId)
        return room
    }

    handleGamesUpdates(playreId, data){
        let room = this.getPlayerRoom(playreId)
        if (room) {
            room.game.update(data)
        }
        
    }
}