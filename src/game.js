import Player from './player.js'
import Enemy from './enemy.js'
import Square from './square.js'
import InputHandler from './input.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.player = new Player(this)
        this.lives = 3
        // squares might be based in levels in refactor
        this.squares = []
        this.square = new Square(this, {x: 0, y: 0}, 15)
        // enemies will be based on levels in refactor
        this.enemy1 = new Enemy(this, {x: 2, y: 0}, {x: 0, y: 150})
        this.enemy2 = new Enemy(this, {x: -2, y: 0}, {x: 770, y: 400})
        this.gameObjects = []

        new InputHandler(this.player, this)
    }

    start() {
        for(let j=0; j<5; j++) {
            for(let i=0; i<6; i++){
                this.squares.push(new Square(this, {x: i * this.gameWidth/6, y: j * this.gameHeight/5}, Math.ceil(Math.random()*100)))
            }
        }

        this.gameObjects = [...this.squares, this.player, this.enemy1, this.enemy2]
        // squares need to load first to be in background
    }

    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime))
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx))
    }
}