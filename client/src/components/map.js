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
                attrs: { className: ui[col]?.className },
                children: [ui[col].content],
            }))
        }))
    }
}
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
        className: "powerUp ",
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
    54: {
        className: "powerUp",
        content: "💛"
    }
}
