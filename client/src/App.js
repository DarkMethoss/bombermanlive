import { createElement, withState, useEffect, useState, useRef, on, off } from '../framework/index.js'
import EntryName from './pages/entryName.js'
import WaitingLobby from './pages/waitingLoby.js'
import GameMap from './pages/gameMap.js'
import GameOver from './pages/gameOver.js'

export let appComponent

export const App = withState(function App(component) {
    appComponent = component
    const [page, setPage] = useState("nameEntry")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const [ws, setWs] = useState(null)
    const wsRef = useRef(null)
    const requestAnimationRef = useRef(null)

    //* Game Map States
    const [players, setPlayers] = useState([])
    const [player, setPlayer] = useState({})
    const [map, setMap] = useState([])

    //* Player states 
    const movementsRef = useRef(new Set())
    const bombPlacedRef = useRef(false)

    useEffect(() => {
        let addMovement = (e) => {
            let key = e.key
            let keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
            if (keys.includes(key)) movementsRef.current.add(key)
            if (key === " ") bombPlacedRef.current = true
        }

        let removeMovement = (e) => {
            let key = e.key
            movementsRef.current.delete(key)
        }

        let clearMovement = () => {
            movementsRef.current.clear()
        }

        if (page === "startGame") {
            on("keydown", addMovement)
            on("keyup", removeMovement)
            on("blur", clearMovement)
        } else {
            off("keydown", addMovement)
            off("keyup", removeMovement)
        }

        return () => {
            off("keydown", addMovement)
            off("keyup", removeMovement)
        }
    }, [page])

    //* nameEntry page states :
    const [playerName, setPlayerName] = useState("")
    const [nameError, setNameError] = useState("")

    useEffect(() => {
        if (page === "nameEntry" && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "setName", data: { name: playerName } }))
        }
        wsRef.current = ws
    }, [ws])

    const lastTimeRef = useRef(0)

    useEffect(() => {
        if (page !== "startGame") return

        function gameLoop(timeStamp) {
            if (!wsRef) return;
            let deltaTime = timeStamp - lastTimeRef.current
            lastTimeRef.current = timeStamp

            let message = { type: "getGameUpdates", data: {} }

            let playerMovements = [...movementsRef.current.values()]
            if (playerMovements.length > 0) {
                message.data.playerMovements = playerMovements
                message.data.deltaTime = deltaTime
            }

            message.data.placedBomb = bombPlacedRef.current

            wsRef.current?.send(JSON.stringify(message))
            bombPlacedRef.current = false

            requestAnimationRef.current = requestAnimationFrame(gameLoop)
        }
        gameLoop(0)
    }, [page])

    //* waitingLobby page states:
    const [seconds, setSeconds] = useState(null)
    const [lobbyState, setLobbyState] = useState(null)

    //* game over page states : 
    const [isWon, setIsWon] = useState(null)

    useEffect(() => {
        if (page === "gameOver" && !isWon) {
            ws.close()
        }
    }, [isWon])

    const handleWebsocket = () => {
        const socket = new WebSocket(`ws://${location.hostname}:8080`)
        socket.onopen = () => {
            console.log('Connected to websocket server')
            setWs(socket)
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const data = message.data
            switch (message.type) {
                case "nameEntry":
                    setNameError(data.error)
                    break;
                case "waitingLobby":
                    if (page !== "waitingLobby") {
                        setPage("waitingLobby")
                    }
                    setPlayers(data.players)
                    setPlayer(data.players.filter((player) => player.name === playerName)[0])
                    setSeconds(data.seconds)
                    setLobbyState(data.state)
                    break;

                case "startGame":
                    setMap(data.map)
                    setPlayers(data.players)
                    setPlayer(data.players.filter((player) => player.name === playerName)[0])
                    setPage("startGame")
                    break;

                case "gameUpdates":
                    setPlayers(data.players)
                    setPlayer(data.players.filter((player) => player.name === playerName)[0])
                    setMap(data.map)
                    break;

                case "gameOver":
                    setPage("gameOver")
                    setIsWon(data.isWon)
                    if (wsRef.current && !data.isWon) wsRef.current.close()
                    cancelAnimationFrame(requestAnimationRef.current)
                    requestAnimationRef.current = null
                    break;

                case "chat":
                    setMessages(prevMessages => [...prevMessages, data])
                    break;

                default:
                    break;
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from websocket server');
            setWs(null)
            wsRef.current = null
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
    }

    //* UI Section:
    if (page === "nameEntry") {
        return createElement(EntryName({
            playerName,
            setPlayerName,
            handleWebsocket,
            nameError,
            setNameError
        }))
    }

    if (page === "waitingLobby") {
        return createElement(WaitingLobby({
            ws,
            players,
            seconds,
            lobbyState,
            messages,
            playerName,
            message,
            setMessage
        }))
    }

    if (page === "startGame") {
        return createElement(GameMap({
            map,
            players,
            player
        }))
    }

    if (page === "gameOver") return createElement(GameOver({ isWon, setPage, setPlayerName, setNameError, setPlayers, setMessages, wsRef }))
})

export default App
