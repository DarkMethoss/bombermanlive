import { useState } from "react"

export default function Chat() {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const handleMessage = (e) => {
        e.preventDefault()
        // console.log("message hna", message)
        if (message.trim()) {
            setMessages(prev => [...prev, { message, sender: "DarkMethoss" }])
        }
        setMessage("")
    }

    return (
        <div className="chat-container">
            <h2>Chat :</h2>
            <div className="chat-window">
                {
                    messages.length > 0
                        ? messages.map((message, index) => <MessageBubble {...message} key={index} />)
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

function MessageBubble({ sender, message }) {
    return <div className="message-bubble">
        <span>{sender}</span>
        <p>{message}</p>
    </div>
}