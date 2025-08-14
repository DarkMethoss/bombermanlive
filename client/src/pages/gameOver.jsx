export default function GameOver({ isWon }) {
    return (
        <div> {isWon ? "You Win !!!" : "You Lost !!!"} </div>
    )
}
