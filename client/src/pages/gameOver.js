export default function GameOver({ ws, isWon, setPage, setPlayerName, setNameError, setPlayers, setMessages }) {
    console.log("game over inside page : ", isWon)

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
                        setPlayerName('')
                        setPlayers([])
                        setNameError('')
                    }
                },
                children: ['Play again']
            }
        ]
    }
}
