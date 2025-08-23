import Map from "../components/map.js";

export default function GameMap({
    // game map state
    map,
    players,
    bricks,
    bombs,
    powerUps,
    flames,

    // player stats states
    speedStat,
    bombStat,
    flameStat,

}) {

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
                        tag: 'span',
                        key: 'gameMap-component-span',
                        attrs: {},
                        children: ['00:00']
                    },
                    {
                        tag: 'span',
                        key: 'gameMap-component-span1',
                        attrs: {},
                        children: ['♥️♥️♥️']
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
                                        children: [`x${bombStat}`]
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
                                        children: [`x${speedStat}`]
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
                                        children: [`x${flameStat}`]
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

                    ...bricks?.map((brick, index) => {
                        return {
                            tag: 'div',
                            key: `brick-${index}`,
                            attrs: {
                                className: 'brick',
                                style: `transform: translate(${brick.x}px, ${brick.y}px)`
                            },
                        }
                    }),

                    ...players?.map((player, index) => {
                        return {
                            tag: 'div',
                            key: `player-${index}`,
                            attrs: {
                                className: 'player',
                                style: `transform: translate(${player.x}px, ${player.y}px);  background: ${player.color}`
                            },
                        }
                    }),

                    ...bombs?.map((bomb, index) => {
                        return {
                            tag: 'div',
                            key: `bomb-${index}`,
                            attrs: {
                                className: 'bomb',
                                style: `transform: translate(${bomb.x}px, ${bomb.y}px);`
                            },
                            children: ['💣']
                        }
                    }),

                    ...flames?.map((flame, index) => {
                          return {
                            tag: 'div',
                            key: `flame-${index}`,
                            attrs: {
                                className: 'flame',
                                style: `transform: translate(${flame.x}px, ${flame.y}px);`
                            },
                            children: ['🔥']
                        }
                    })
                ]
            }
        ]
    }
}

const gameStats = {
    display: "flex",
    justifyContent: "space-between",
}