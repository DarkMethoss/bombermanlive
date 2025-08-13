import { useEffect, useState } from 'react'
import EntryName from './pages/entryName'
import WaitingLobby from './pages/waitingLoby'
import GameMap from './pages/gameMap'

function App() {
  const [page, setPage] = useState("nameEntry")
  const [ws, setWs] = useState(null);

  //* nameEntry page states :
  const [playerName, setPlayerName] = useState("")
  const [nameError, setNameError] = useState("")
  useEffect(() => {
    if (page === "nameEntry" && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "setName", data: { name: playerName } }))
    }
  }, [ws])
  
  //* waitingLobby page states:
  const [players, setPlayers] = useState([])
  const [seconds, setSeconds] = useState(null)
  
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
          if (data.seconds) setSeconds(data.seconds)
          break;
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
      setPlayers={setPlayers}
      seconds={seconds}
      setSeconds={setSeconds}
    />)
  if (page === "gameMap") return <GameMap ws={ws} />
}

export default App
