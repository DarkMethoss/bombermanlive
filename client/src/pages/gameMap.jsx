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
    player
}) {
    console.log(Array.from({ length: player.hearts }, () => player))
    return (
        <section className="page game-page">
            <div className="game-stats">
                {
                    Array.from({ length: player.hearts }, () => player)
                        .map(player =>
                            <div key={player.name} className="player"
                                style={{ backgroundImage: `url(${colorMap[player.color]})`, position: "unset" }}></div>
                        )
                }



                <div className="game-powerups-container">
                    <div className="powerup">💣<span>x{player.bomb}</span></div>
                    <div className="powerup">⚡<span>x{player.speed}</span></div>
                    <div className="powerup">🔥<span>x{player.flame}</span></div>
                </div>
            </div>
            <div className="game-map-container">
                <Map map={map} />
                {
                    players?.map((player, index) => <div key={index} className="player"
                        style={{ transform: `translate(${player.x}px, ${player.y}px)`, backgroundImage: `url(${colorMap[player.color]})` }}></div>)
                }
            </div>
        </section>
    )
}
