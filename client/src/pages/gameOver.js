export default function GameOver({ isWon, setPage, setPlayerName, setNameError, setPlayers, setMessages, wsRef}) {
    return {
        tag: 'div',
        key: 'gameOver-component-div',
        attrs: { className: 'gameOver' },
        children: [
            isWon ? "You Win !!!" : "You Lost !!!",

            {
                tag: 'button',
                key: 'gameOver-component-button',
                attrs: {
                    className: 'gameOverButton',
                    onclick: () => {
                        setPage('nameEntry')
                        setMessages([])
                        setPlayers([])
                        setPlayerName('')
                        setNameError('')
                        wsRef.current = null
                    }
                },
                children: ['Play again']
            }
        ]
    }
}
