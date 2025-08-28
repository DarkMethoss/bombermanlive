import { generateId, useState } from '../../framework/index.js'

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


    return {
        tag: 'div',
        key: 'chat-component-div',
        attrs: { className: "chat-container" },
        children: [
            {
                tag: 'h2',
                key: 'chat-component-h2',
                attrs: {},
                children: ['Chat :'],
            },
            {
                tag: 'div',
                key: 'chat-component-div1',
                attrs: { className: 'chat-window' },
                children: [
                    messages.length > 0
                        ? messages.map((message, index) => MessageBubble({message, index, playerName}))
                        : "type something and start chating"
                ] 
            },
            {
                tag: 'form',
                key: 'chat-component-form',
                attrs: {
                    onSubmit: (e) => handleMessage(e)
                },
                children: [
                    {
                        tag: 'input',
                        key: 'chat-component-input',
                        attrs: { placeholder: 'send a message', type: 'text', name: 'message', value: message, onChange: (e) => setMessage(e.target.value) },
                        children: [],
                    },
                    {
                        tag: 'button',
                        key: 'chat-component-button',
                        attrs: { type: 'submit' },
                        children: ['Send']
                    }
                ]
            }
        ],
    }
}

function MessageBubble({ playerName, index, message }) {
    return {
        tag: 'div',
        key: `message-${index}`,
        attrs: { className: `message-bubble ${playerName === message.sender ? "my-message" : ""}` },
        children: [
            {
                tag: 'span',
                key: `span${id}`,
                children: [message.sender],
            },
            {
                tag: 'p',
                key: `p${id}`,
                children: [message.content]
            }
        ]
    }
}