import { powerUp } from "../../../server/classes/powerup";
import Map from "../components/map";
import redImg from '../assets/red.png';
import blueImg from '../assets/blue.png';
import greenImg from '../assets/green.png';
import yellowImg from '../assets/yellow.png';


const colorMap = {
    red: redImg,
    blue: blueImg,
    green: greenImg,
    yellow: yellowImg
};

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
    
    // console.log("powerUps", powerUps)
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
                {
                    bricks?.map((brick, index) => <div key={index} className="brick"
                        style={{ transform: `translate(${brick.x}px, ${brick.y}px)` }}></div>)
                }
                {
                    players?.map((player, index) => <div key={index} className="player"
                        style={{ transform: `translate(${player.x}px, ${player.y}px)`, backgroundImage: `url(${colorMap[player.color]})` }}></div>)
                }
                {
                    bombs?.map((bomb, index) => <div key={index} className="bomb"
                        style={{ transform: `translate(${bomb.x}px, ${bomb.y}px)` }}>💣</div>)
                }
                {
                    flames?.map((flame, index) => <div key={index} className="flame"
                        style={{ transform: `translate(${flame.x}px, ${flame.y}px)` }}>🔥</div>)
                }

                {
                    powerUps?.map((powerUp, index) => {
                        if (powerUp.type === 'speed') {
                            return (
                                <div key={index} className="powerUp"
                                    style={{ transform: `translate(${powerUp.position.x}px, ${powerUp.position.y}px)` }}>⚡</div>
                            );
                        } else if (powerUp.type === 'range') {
                            return (
                                <div key={index} className="powerUp flameUp"
                                    style={{ transform: `translate(${powerUp.position.x}px, ${powerUp.position.y}px)` }}></div>
                            );
                        } else {
                            return (
                                <div key={index} className="powerUp bombUp"
                                    style={{ transform: `translate(${powerUp.position.x}px, ${powerUp.position.y}px)` }}></div>
                            );
                        }
                    })
                }




            </div>
        </section>
    )
}

const gameStats = {
    display: "flex",
    justifyContent: "space-between",
}