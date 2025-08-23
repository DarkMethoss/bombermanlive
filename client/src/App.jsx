import { useEffect, useState, useRef } from 'react'
import EntryName from './pages/entryName'
import WaitingLobby from './pages/waitingLoby'
import GameMap from './pages/gameMap'
import GameOver from './pages/gameOver'

function App() {
  const [page, setPage] = useState("nameEntry")
  const [ws, setWs] = useState(null)
  const wsRef = useRef(null)

  //* Game Map States
  const [bricks, setBricks] = useState()
  const [bombs, setBombs] = useState()
  const [powerUps, setPowerUps] = useState()
  const [flames, setFlames] = useState()
  const [players, setPlayers] = useState()
  const [map, setMap] = useState()

  //* Player states 
  const [speedStat, setSpeedStat] = useState(1)
  const [bombStat, setBombStat] = useState(1)
  const [flameStat, setFlameStat] = useState(1)
  const movementsRef = useRef(new Set())
  const bombPlacedRef = useRef(false)

  useEffect(() => {
    let addMovement = (e) => {
      let key = e.key
      let keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
      if (key === " ") bombPlacedRef.current = true
      if (keys.includes(key)) movementsRef.current.add(key)
    }

    let removeMovement = (e) => {
      let key = e.key
      movementsRef.current.delete(key)
      // if (key === " ") bombPlacedRef.current = false
    }

    if (page === "startGame") {
      document.addEventListener("keydown", addMovement)
      document.addEventListener("keyup", removeMovement)
    } else {
      document.removeEventListener("keydown", addMovement)
      document.removeEventListener("keyup", removeMovement)
    }

    return () => {
      document.removeEventListener("keydown", addMovement)
      document.removeEventListener("keyup", removeMovement)
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
      if (!ws) return;
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
      requestAnimationFrame(gameLoop)
    }
    gameLoop(0)
  }, [page])

  //* waitingLobby page states :
  const [seconds, setSeconds] = useState(null)
  const [lobbyState, setLobbyState] = useState(null)

  //* game over page states : 
  const [isWon, setIsWon] = useState(null)
  const handleWebsocket = () => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('Connected to websocket server');
      setWs(socket);
    };

    //* handle messages send from server
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
          setSeconds(data.seconds)
          setLobbyState(data.state)
          break;

        case "startGame":
          setPage("startGame")
          setMap(data.map)
          setPlayers(data.players)
          setBricks(data.bricks)
          break;

        case "gameUpdates":
          setPlayers(data.players)
          setBricks(data.bricks)
          setBombs(data.bombs)
          break;

        case "gameOver":
          setPage("gameOver")
          setIsWon(data.isWon)
          break;

        default:
          break;
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from websocket server');
      setWs(null)
      setPage("nameEntry")
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  }

  //* UI Section:
  if (page === "nameEntry") return (
    <EntryName
      playerName={playerName}
      setPlayerName={setPlayerName}
      handleWebsocket={handleWebsocket}
      nameError={nameError}
      setNameError={setNameError}
    />
  )

  if (page === "waitingLobby") return (
    <WaitingLobby
      ws={ws}
      players={players}
      seconds={seconds}
      lobbyState={lobbyState}
    />
  )

  if (page === "startGame") return (
    <GameMap
      map={map}
      players={players}
      bricks={bricks}
      bombs={bombs}
      powerUps={powerUps}
      flames={flames}
      speedStat={speedStat}
      bombStat={bombStat}
      flameStat={flameStat}
    />
  )

  if (page === "gameOver") return (
    <GameOver isWon={isWon} />
  )
}

export default App
