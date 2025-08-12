import { useState } from "react"
import CountdownTimer from "../components/countdown"
import Chat from "../components/chat"

export default function WaitingLobby({ws}) {
    const [players, setPlayers] = useState(["DarkMethoss", " uma-oo", "haaamzaa"])
    return (
        <section className={"waiting-lobby page"}>
            <div className="count-down-container">
                <h1>Waiting for players...</h1> 
                <CountdownTimer initialSeconds={20} />
            </div>
            <div className="players-container" >
                {
                    players.map(name => <div className="player-item" key={name}>{name}</div>)
                }
            </div>
            <Chat />
        </section>
    )
}
