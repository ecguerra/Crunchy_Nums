import Player from './player.js'
import InputHandler from './input.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.player = new Player(this)
        this.gameObjects = []

        new InputHandler(this.player, this)
    }

    start() {
        this.gameObjects = [this.player]
    }

    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime))
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx))
    }
}