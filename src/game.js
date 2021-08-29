import Player from './player.js'
import Enemy from './enemy.js'
import Square from './square.js'
import InputHandler from './input.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.square = new Square(this, {x: 0, y: 0}, 15)
        this.player = new Player(this)
        this.enemy1 = new Enemy(this, {x: 2, y: 0}, {x: 0, y: 150})
        this.enemy2 = new Enemy(this, {x: -2, y: 0}, {x: 770, y: 400})
        this.gameObjects = []

        new InputHandler(this.player, this)
    }

    start() {
        this.gameObjects = [this.square, this.player, this.enemy1, this.enemy2]
    }

    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime))
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx))
    }
}