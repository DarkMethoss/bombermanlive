import Map from "../components/map.js";

export default function GameMap({ map, players, player }) {
    return {
        tag: 'section',
        key: 'gameMap-component-section',
        attrs: { className: 'page game-page' },
        children: [
            {
                tag: 'div',
                key: 'gameMap-component-div',
                attrs: { className: 'game-stats' },
                children: [
                    {
                        tag: 'div',
                        key: 'gameMap-component-div10',
                        attrs: { className: 'flex gap-1' },
                        children: Array.from({ length: player.hearts }, () => player)
                            .map((player, index) => {
                                return {
                                    tag: 'div',
                                    key: `gameMap-component-${index}`,
                                    attrs: {
                                        className: `player player-${player.color}`,
                                        style: `position: unset;`,
                                    },
                                }
                            },
                            )
                    },
                    {
                        tag: 'div',
                        key: 'gameMap-component-div1',
                        attrs: { className: "game-powerups-container" },
                        children: [
                            {
                                tag: 'div',
                                key: 'gameMap-component-div2',
                                attrs: { className: "powerup" },
                                children: [
                                    '💣',
                                    {
                                        tag: 'span',
                                        key: 'gameMap-component-span2',
                                        attrs: {},
                                        children: [`x${player.bomb}`]
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                key: 'gameMap-component-div3',
                                attrs: { className: "powerup" },
                                children: [
                                    '⚡',
                                    {
                                        tag: 'span',
                                        key: 'gameMap-component-span3',
                                        attrs: {},
                                        children: [`x${player.speed}`]
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                key: 'gameMap-component-div4',
                                attrs: { className: "powerup" },
                                children: [
                                    '🔥',
                                    {
                                        tag: 'span',
                                        key: 'gameMap-component-span4',
                                        attrs: {},
                                        children: [`x${player.flame}`]
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                key: 'gameMap-component-div5',
                                attrs: { className: "powerup" },
                                children: [
                                    '👾',
                                    {
                                        tag: 'span',
                                        key: 'gameMap-component-span5',
                                        attrs: {},
                                        children: [`x${player.passBombs}`]
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                tag: 'div',
                key: 'gameMap-component-div5',
                attrs: { className: 'game-map-container' },
                children: [
                    Map({ map }),
                    ...players?.map((player, index) => {
                        return {
                            tag: 'div',
                            key: `player-${index}`,
                            attrs: {
                                className: `player player-${player.color}`,
                                style: `transform: translate(${player.x}px, ${player.y}px);`
                            },
                        }
                    }),
                ]
            }
        ]
    }
}