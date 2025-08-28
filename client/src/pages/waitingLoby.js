
import Chat from "../components/chat.js"

export default function WaitingLobby({ ws, players, seconds, lobbyState, messages, playerName, message, setMessage }) {

    return {
        tag: 'section',
        key: 'waitingLobby-component-section',
        attrs: { className: "waiting-lobby page" },
        children: [
            {
                tag: 'div',
                key: 'waitingLobby-component-div',
                attrs: { className: 'count-down-container' },
                children: [
                    lobbyState === "waitingCountDown" ? {tag: 'h1', key: 'waitingLobby-component-h1', attrs:{}, children: ['Waiting for players...'] } : '',
                    lobbyState === "gameStartCountDown" ? {tag: 'h1', key: 'waitingLobby-component-h11', attrs:{}, children: ['Game starts in:'] } : '',
                    players.length > 1 ?
                        {
                            tag: 'span',
                            key: 'waitingLobby-component-span',
                            attrs: { style: 'font-size: 2rem; font-weight: bold' },
                            children: [
                                '00:' + (seconds < 10 ? `0${seconds}` : seconds)
                            ],
                        } : '',
                ]
            },
            {
                tag: 'div',
                key: 'waitingLobby-component-div10',
                attrs: { className: 'playerCounter' },
                children: [
                   `${players.length}/4`
                ]
            },
            {
                tag: 'div',
                key: 'waitingLobby-component-div1',
                attrs: { className: 'players-container' },
                children: players.map(name => {
                    return {
                        tag: 'div',
                        key: `player-${name}`,
                        attrs: { className: 'player-item' },
                        children: [name]
                    }
                })
            },
            Chat({ws, playerName, messages, message, setMessage})
        ]
    }
}
