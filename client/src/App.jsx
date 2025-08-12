import { useState } from 'react'
import './App.css'
import EntryName from './pages/entryName'

function App() {
  const [page, setPage] = useState("nameEntry")
  

  switch (page) {
    case "enterName":
      <EntryName />
      break;
    case "waitingLoby":
      <waitingLoby />
      break;
    case "gameMap":
      <GameMap />
      break;
  }

}

export default App
