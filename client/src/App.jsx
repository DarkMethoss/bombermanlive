import { useEffect, useState } from 'react'
import EntryName from './pages/entryName'
import WaitingLobby from './pages/waitingLoby'
import GameMap from './pages/gameMap'

function App() {
  const [page, setPage] = useState("nameEntry")
  const [playerName, setPlayerName] = useState("")
  const [players, setPlayers] = useState([])
  const [group, setGroup] = useState(null);
  const [ws, setWs] = useState(null);

  const handleWebsocket = () => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to websocket server');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "waitingLobby":
          setPage()
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

  useEffect(()=>{
    if ( page === "nameEntry" && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({type:"setName", data:{name:playerName}}))
    }
  },[ws])

  console.log(ws)
  if (page === "nameEntry") return <EntryName playerName={playerName} setPlayerName={setPlayerName} handleWebsocket={handleWebsocket} />
  if (page === "waitingLoby") return <WaitingLobby ws={ws} />
  if (page === "gameMap") return <GameMap ws={ws} />
}

export default App
