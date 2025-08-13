import { generateId } from "../utils/utils.js"
import { Player } from "./player.js"
import Room from "./room.js"


//* Server class : handles websocket game server
//* - handle players ( remove and add to rooms )
//* - handle rooms ( create and delete rooms if empty )
export default class Server {
    constructor(wss) {
        this.server = wss
        this.players = new Map() // [playerId, {player: new Player(), roomId: RoomId} ]
        this.rooms = new Map() // [groupId, Room]
        wss.on("connection", ws => this.handleConnection(ws))
    }

    handleConnection(ws) {
        let playerId = generateId("P")

        ws.on("close", () => {
            console.log("Client disconnected")
            this.handleDisconnection(playerId)
        })

        ws.on("message", (message) => {
            const parsed = JSON.parse(message);
            const { type, data } = parsed;
            switch (type) {
                case "setName":
                    this.handlePlayer(ws, data.name, playerId)
                    break;
                case "startGame":
                default:
                    break;
            }
        })
    }

    handlePlayer(ws, playerName, playerId) {
        let emptyRooms = [...this.rooms.values()].filter(room => room.isEmpty())
        let roomCanJoin = emptyRooms.find(room => room.isValidName(playerName))
        let newPlayer = new Player(this, ws, playerId)

        if (emptyRooms.length > 0 && roomCanJoin) {
            this.players.set(playerId, { player: newPlayer, roomId: roomCanJoin.id })
            roomCanJoin.addPlayer(playerId, playerName, newPlayer)
        }
        else if (emptyRooms.length > 0 && !roomCanJoin) {
            let message = { type: "nameEntry", data: { error: "userName already exists" } }
            ws.send(JSON.stringify(message))
        }
        else {
            let roomId = generateId("R")
            let newRoom = new Room(roomId, this)
            this.rooms.set(roomId, newRoom)
            this.players.set(playerId, { player: newPlayer, roomId })
            newRoom.addPlayer(playerId, playerName, newPlayer)
        }
    }

    handleDisconnection(playerId) {
        let playerData = this.players.get(playerId)
        if (!playerData) return

        let {player, roomId } = playerData
        console.log(player.roomId)

        let room = this.rooms.get(roomId)
        if (room) {
            room.removePlayer(playerId)
            if (room.players.size === 0) {
                this.rooms.delete(roomId)
            }
        }

        this.players.delete(playerId)
    }

}