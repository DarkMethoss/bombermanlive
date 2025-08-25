import { useState } from "react"

export default function Chat({ ws, playerName, messages }) {
    const [message, setMessage] = useState("")

    const handleMessage = (e) => {
        e.preventDefault()
        if (message.trim()) {
            let payload = { type: "chat", data: { sender: playerName, content: message } }
            ws.send(JSON.stringify(payload))
        }
        setMessage("")
    }

    return (
        <div className="chat-container">
            <h2>Chat :</h2>
            <div className="chat-window">
                {
                    messages.length > 0
                        ? messages.map((message, index) => <MessageBubble message={message} key={index} playerName={playerName} />)
                        : "type something and start chating"
                }
            </div>
            <form onSubmit={handleMessage}>
                <input placeholder="send a me" type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

function MessageBubble({ playerName, message }) {
    return <div className={`message-bubble ${playerName === message.sender ? "my-message" : ""}`} >
        <span>{message.sender}</span>
        <p>{message.content}</p>
    </div>
}