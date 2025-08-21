import { generateId, useState } from '../../framework/index.js'

export default function Chat() {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    function handleMessage(e) {
        e.preventDefault()
        if (message.trim()) {
            setMessages([...messages, { id: generateId(), message, sender: "DarkMethoss" }])
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
                        ? messages.map((message) => MessageBubble(message))
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

function MessageBubble({ id, sender, message }) {
    return {
        tag: 'div',
        key: id,
        attrs: { className: 'message-bubble' },
        children: [
            {
                tag: 'span',
                key: `span${id}`,
                attrs: {},
                children: [sender],
            },
            {
                tag: 'p',
                key: `p${id}`,
                attrs: {},
                children: [message]
            }
        ]
    }
}