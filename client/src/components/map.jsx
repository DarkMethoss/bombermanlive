import { useState } from "react";

export default function Map({map}) {
  console.log("map inside the", map);
    return (
        <div className="game-map">
            {map.map((row, rowIndex) => (
                <div className="map-row" key={rowIndex} style={{display:"contents"}}>
                    {row.map((col, colIndex) => (
                        <div
                            key={colIndex}
                            className = {col === 0 ? "empty-space": "wall"}
                        />
                    ))}
                    
                </div>
            ))}
        </div>
    )
}
