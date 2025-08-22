import Map from "../components/map";

export default function GameMap({
    // game map state
    map,
    players,
    bricks,
    bombs,
    powerUps,
    flames,

    // player stats states
    speedStat,
    bombStat,
    flameStat,
}) {
    // console.log(players)
    return (
        <section className="page game-page">
            <div className="game-stats">
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="game-powerups-container">
                    <div className="powerup">💣<span>x{bombStat}</span></div>
                    <div className="powerup">⚡<span>x{speedStat}</span></div>
                    <div className="powerup">🔥<span>x{flameStat}</span></div>
                </div>
            </div>
            <div className="game-map-container">
                <Map map={map} />
                {/* todo: place game elements  */}
                {
                    bricks?.map((brick, index) => <div key={index} className="brick"
                        style={{ transform: `translate(${brick.x}px, ${brick.y}px)` }}></div>)
                }
                {
                    players?.map((player, index) => <div key={index} className="player"
                        style={{ transform: `translate(${player.x}px, ${player.y}px)`, background: `${player.color}` }}></div>)
                }
            </div>
        </section>
    )
}

const gameStats = {
    display: "flex",
    justifyContent: "space-between",
}