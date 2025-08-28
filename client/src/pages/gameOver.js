export default function GameOver({ ws, isWon, setPage, setPlayerName, setNameError }) {
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
                        setPlayerName('')
                        setNameError('')
                        if (ws) ws.close()
                    }
                },
                children: ['Play again']
            }
        ]
    }
}
