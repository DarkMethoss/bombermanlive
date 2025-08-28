import { createElement } from "../../framework/index.js"

export default function Chat({ ws, playerName, messages, message, setMessage }) {
    const handleMessage = (e) => {
        e.preventDefault()
        if (message.trim()) {
            let payload = { type: "chat", data: { sender: playerName, content: message } }
            ws.send(JSON.stringify(payload))
        }
        setMessage("")
    }

    return createElement({
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
                children: [...messages?.map((message, index) => {
                    return MessageBubble({ message, index, playerName })
                })
                ]
            },
            {
                tag: 'form',
                key: 'chat-component-form',
                attrs: {
                    onsubmit: (e) => handleMessage(e)
                },
                children: [
                    {
                        tag: 'input',
                        key: 'chat-component-input',
                        attrs: {
                            placeholder: 'send a message', type: 'text', name: 'message', value: message,
                            oninput: (e) => {
                                setMessage(e.target.value)
                            }
                        },
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
    })
}

function MessageBubble({ message, index, playerName }) {
    return {
        tag: 'div',
        key: `message-${index}`,
        attrs: { className: `message-bubble ${playerName === message.sender ? "my-message" : ""}` },
        children: [
            {
                tag: 'span',
                key: `span${index}`,
                children: [message.sender],
            },
            {
                tag: 'p',
                key: `p${index}`,
                children: [message.content]
            }
        ]
    }
}