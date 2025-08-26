export default function Map({ map }) {
    return (
        <div className="game-map">
            {map.map((row, rowIndex) => (
                <div className="map-row" key={rowIndex} style={{ display: "contents" }}>
                    {row.map((col, colIndex) => (
                        <div className={ui[col].className} key={colIndex}>{ui[col].content}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

// 0: empty space
// 1: Wall
// 2: Brick
// 3: bomb
// 4: flame
// 5: powerup
// 51 speed
// 52 bomb
// 53 flame 

const ui = {
    0: {
        className: "empty-space",
        content: ""
    },
    1: {
        className: "wall",
        content: ""
    },
    2: {
        className: "brick",
        content: ""
    },
    3: {
        className: "bomb",
        content: "💣"
    },
    4: {
        className: "flame",
        content: "🔥"
    },
    51: {
        className: "powerUp speedUp ",
        content: "⚡"
    },
    52: {
        className: "powerUp bombUp",
        content: ""
    },
    53: {
        className: "powerUp flameUp",
        content: ""
    },
}
