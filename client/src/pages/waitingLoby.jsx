import { useState } from "react"
import CountdownTimer from "../components/countdown"
import Chat from "../components/chat"
import { useEffect } from "react"

export default function WaitingLobby({ ws, players, setPlayers, seconds, setSeconds }) {
    useEffect(() => {

    }, seconds)

    useEffect(() => {
        if (players.length >= 2) setSeconds(20)
        if (players.length == 1) setSeconds(null)

    }, [players, setPlayers])

    return (
        <section className={"waiting-lobby page"}>
            <div className="count-down-container">
                <h1>Waiting for players...</h1>
                {seconds && <CountdownTimer seconds={seconds} setSeconds={setSeconds} />}
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
