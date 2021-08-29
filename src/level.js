export default class Level {
    constructor(game, level) {
        this.level = level
        this.enemies = level.enemies
        this.answerNum = level.answerNum
    }
}