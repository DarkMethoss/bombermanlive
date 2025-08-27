export default function Map({ map }) {

    return {
        tag: 'div',
        key: 'map-component-div',
        attrs: { className: 'game-map' },
        children: map.map((row, rowIndex) => ({
            tag: 'div',
            key: `div1${rowIndex}`,
            attrs: { className: 'map-row', style: 'display: contents' },
            children: row.map((col, colIndex) => ({
                tag: 'div',
                key: `div2${colIndex}`,
                attrs: { className: col === 0 ? "empty-space" : "wall" },
                children: [],
            }))
        }))
    }
}
