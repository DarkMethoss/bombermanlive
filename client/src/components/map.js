export default function Map({ map }) {
    return {
        tag: 'div',
        key: 'map-component-div',
        attrs: { className: 'game-map' },
        children: map.map((row, rowIndex) => ({
            tag: 'div',
            key: rowIndex,
            attrs: { className: 'map-row', style: 'display: contents' },
            children: row.map((col, colIndex) => ({
                tag: 'div',
                key: colIndex,
                attrs: { className: col === 0 ? "empty-space" : "wall" },
                children: [],
            }))
        }))
    }
}
