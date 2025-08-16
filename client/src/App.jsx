import { useEffect, useState } from 'react'
import EntryName from './pages/entryName'
import WaitingLobby from './pages/waitingLoby'
import GameMap from './pages/gameMap'
import GameOver from './pages/gameOver'

function App() {
  const [page, setPage] = useState("nameEntry")
  const [ws, setWs] = useState(null);


  //* Game Map States
  const [bricks, setBricks] = useState()
  const [bombs, setBombs] = useState()
  const [players, setPlayers] = useState()

  //* Player states 
  const [movements, setMovements] = useState(new Set())
  useEffect(() => {
    let addMovement = (e) => {
      let key = e.key
      console.log("key down: ", key)
      let keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
      if (keys.includes(key)) setMovements(prev => new Set(prev).add(key))
    }

    let removeMovement = (e) => {
      let key = e.key
      let copy = new Set(movements)
      copy.delete(key)
      setMovements(copy)
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
  }, [ws])

  useEffect(() => {
    let lastTime = 0;
    function gameLoop(timeStamp) {
      requestAnimationFrame(gameLoop);
    }
    gameLoop(0);
  },[])

  //* waitingLobby page states:
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

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("====>", message);
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
        case "startGame": {
          setPage("startGame")
          break;
        }
        case "gameOver": {
          setPage("gameOver")
          setIsWon(data.isWon)
          break;
        }
        default:
          break;
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from websocket server');
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
    />)

  if (page === "waitingLobby") return (
    <WaitingLobby
      ws={ws}
      players={players}
      seconds={seconds}
      lobbyState={lobbyState}
    />)
  if (page === "startGame") return (
    <GameMap ws={ws} />
  )
  if (page === "gameOver") return (
    <GameOver isWon={isWon} />
  )
}

export default App
