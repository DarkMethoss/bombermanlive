export default function GameOver({ isWon }) {
    return {
        tag: 'div',
        key: 'gameOver-component-div',
        attrs: {},
        children: [isWon ?  "You Win !!!" : "You Lost !!!"]
    }
}
