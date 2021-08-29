import Square from './square.js'
import Enemy from './enemy.js'

export default class Level {
    constructor(game, level) {
        this.level = level
        this.enemies = level.enemies
        this.squares = []
        this.answerNum = level.number
    }
}