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
                        if (ws) ws.close()
                        setPage('nameEntry')
                        setPlayerName('')
                        setNameError('')
                    }
                },
                children: ['Play again']
            }
        ]
    }
}
