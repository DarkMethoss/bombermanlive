
export default function EntryName({ playerName, setPlayerName, handleWebsocket, nameError, setNameError }) {
  function handleSubmit(e) {
    e.preventDefault()
    let data = new FormData(e.target)
    let playerName = data.get("userName")
    if (!playerName || playerName.trim() === "") {
      setNameError("You need to provide a name")
      return
    }
    handleWebsocket()
  }

  return {
    tag: 'form',
    key: 'EntryName-component-form',
    attrs: { onsubmit: (e) => handleSubmit(e) },
    children: [
      {
        tag: 'label',
        key: 'EntryName-component-label',
        attrs: { htmlFor: 'userName' },
        children: [' Enter Name '],
      },
      {
        tag: 'input',
        key: 'EntryName-component-input',
        attrs: { id: 'userName', name: 'userName', type: 'text', value: playerName, onchange: (e) => setPlayerName(e.target.value) },
        children: [],
      },
      nameError ? { tag: 'span', key: 'EntryName-component-span', attrs: {}, children: [nameError] } : '',
    ],
  }
}

const form = {
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  gap: "1rem"
}

const label = {
  width: "max-width",
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