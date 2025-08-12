import { useState } from "react"

export default function EntryName({ playerName, setPlayerName, ws, handleWebsocket }) {
  const [nameError, setNameError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = new FormData(e.target)
    let playerName = data.get("userName")
    if (!playerName || playerName.trim() === "") {
      setNameError("You need to provide a name");
      return; // stop here if invalid
    }
    handleWebsocket()

  }

  return (
    <form style={form} onSubmit={handleSubmit} >
      <label style={label} htmlFor="userNmae"> Enter Name </label>
      <input
        id="userName"
        name="userName"
        type="text"
        style={input}
        value={playerName}
        onChange={e => setPlayerName(e.target.value)} />
      {nameError && <span style={error}>{nameError}</span>}
    </form>
  )
}

const form = {
  padding :"30vh" ,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem"
}

const label = {
  fontSize: "1.5rem",
  letterSpacing: ".5rem"
}

const input = {
  padding: "0.5rem 1rem",
  width: "100%",
  maxWidth: "250px"
}

const error = {
  color: "red",
  fontWeight: "bold"
}