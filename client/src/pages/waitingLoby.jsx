
import Chat from "../components/chat"

export default function WaitingLobby({ ws, players, seconds,lobbyState  }) {
    return (
        <section className={"waiting-lobby page"}>
            <div className="count-down-container">
                {lobbyState === "waitingCountDown" && <h1>Waiting for players...</h1>} 
                {lobbyState === "gameStartCountDown" && <h1>Game starts in: </h1>}
                {players.length > 1 && <span style={{ fontSize: "2rem", fontWeight: "bold" }}>00:{+seconds < 10 ? `0${seconds}`: seconds}</span>}
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
