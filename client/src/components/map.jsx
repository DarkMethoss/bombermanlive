import { useState } from "react";

export default function Map({map}) {
  console.log("map inside the", map);
    return (
        <div className="game-map">
            {map.map((row, rowIndex) => (
                <div className="map-row" key={rowIndex} style={{display:"contents"}}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`map-cell`}
                            style={{
                                backgroundColor: getColorForCell(cell)
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

const getColorForCell = (value) => {
    switch (value) {
        case 0:
            return "#333"; // wall
            case 1:
            return "#fff"; // empty space
        case 2:
            return "#ff0"; // bricks
        case 3:
            return "#f00"; // bomb
        default:
            return "#fff";
    }
};