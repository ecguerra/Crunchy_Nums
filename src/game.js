import Player from './player.js'
import Enemy from './enemy.js'
import Square from './square.js'
// import { buildLevel, loadEnemies } from './levels.js'
import InputHandler from './input.js'
import Level from './level.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.player = new Player(this)
        this.lives = 3
        this.levels = [
            new Level(this, {
                answerNum: Math.ceil(Math.random() * 10),
                enemies: [
                    new Enemy(this, {x: 1, y: 0}, {x: 0, y: 150}), 
                    new Enemy(this, {x: -1, y: 0}, {x: 770, y: 400})
                ]
            })
        ]
        this.currentLevel = 0
        // squares might be based in levels in refactor - leave for now
        this.squares = []
        this.enemies = []
        this.gameObjects = []

        new InputHandler(this.player, this)
    }

    start() {
        for(let j=0; j<5; j++) {
            for(let i=0; i<6; i++){
                this.squares.push(new Square(this, {x: i * this.gameWidth/6, y: j * this.gameHeight/5}, Math.ceil(Math.random()*100)))
            }
        }

        console.log('current factor: ', this.levels[this.currentLevel].answerNum)

        this.levels[this.currentLevel].enemies.forEach(enemy => this.enemies.push(enemy))
        this.gameObjects = [this.player, ...this.enemies]
    }
    
    update(deltaTime) {
        // squares need to load first to be in background
        [...this.squares, ...this.gameObjects].forEach(obj => obj.update(deltaTime))
        this.squares = this.squares.filter(squares => squares.display)

    }

    draw(ctx) {
        [...this.squares, ...this.gameObjects].forEach(obj => obj.draw(ctx))
    }
}