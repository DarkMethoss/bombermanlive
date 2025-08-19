import { useState } from "react";
import Map from "../components/map";

export default function GameMap({ws  , map}) {
    const [speed, setSpeed] = useState(1)
    const [bombs, setBombs] = useState(1)
    const [flame, setFlame] = useState(1)

    return (
        <section className="page game-page">
            <div className="game-stats">
                <span>
                    00:00
                </span>
                <span> ♥️♥️♥️</span>
                <div className="game-powerups-container">
                    <div className="powerup">💣<span>x{bombs}</span></div>
                    <div className="powerup">⚡<span>x{speed}</span></div>
                    <div className="powerup">🔥<span>x{flame}</span></div>
                </div>
            </div>
            <Map  map={map} />
        </section>
    )
}

const gameStats = {
    display: "flex",
    justifyContent: "space-between",
}