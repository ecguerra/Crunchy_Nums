import Player from './player.js'
import Enemy from './enemy.js'
import Square from './square.js'
// import { buildLevel, loadEnemies } from './levels.js'
import InputHandler from './input.js'
import Level from './level.js'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WIN: 5
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.gamestate = GAMESTATE.MENU
        this.player = new Player(this)
        this.lives = 3
        this.points = 0
        this.totalAnswers = 0
        this.levels = [
            new Level(this, {
                answerNum: Math.ceil(Math.random() * 10), // min/max might be good to get rid of 1
                enemies: [
                    new Enemy(this, {x: 1, y: 0}, {x: 0, y: 150}), 
                    new Enemy(this, {x: -1, y: 0}, {x: 770, y: 400})
                ],
                scopeNum: 100
            }),
            new Level(this, {
                answerNum: Math.ceil(Math.random() * 12),
                enemies: [
                    new Enemy(this, {x: 0, y: 2}, {x: 237, y: 0}), 
                    new Enemy(this, {x: 0, y: -2}, {x: 533, y: 550})
                ],
                scopeNum: 144
            }),
        ]
        this.currentLevel = 0
        this.squares = []
        this.enemies = []
        this.gameObjects = []

        new InputHandler(this.player, this)
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return

        this.levels[this.currentLevel].buildLevel()

        console.log('current factor: ', this.levels[this.currentLevel].answerNum)

        this.totalAnswers = this.levels[this.currentLevel].totalAnswers
        this.levels[this.currentLevel].enemies.forEach(enemy => this.enemies.push(enemy))
        this.gameObjects = [this.player, ...this.enemies]
        this.gamestate = GAMESTATE.RUNNING
    }
    
    update(deltaTime) {
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER
        if(this.gamestate !== GAMESTATE.RUNNING) return

        if(this.totalAnswers === 0) {
            this.currentLevel++ // need transition/something to stop chomping 1st number

            if(this.currentLevel < this.levels.length) {
                this.gamestate = GAMESTATE.NEWLEVEL
                this.player.reset()
                this.squares = []
                this.enemies = []
                this.start()
            } else {
                this.gamestate = GAMESTATE.WIN
            }
        }

        if(this.points === 100) {
            this.lives++
            console.log('extra life! lives: ', this.lives)
            this.points = 0
        }

        // squares need to load first to be in background
        [...this.squares, ...this.gameObjects].forEach(obj => obj.update(deltaTime))
        this.squares = this.squares.filter(squares => squares.display)

    }

    draw(ctx) {
        [...this.squares, ...this.gameObjects].forEach(obj => obj.draw(ctx))

        if(this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,0.5)'
            ctx.fill()

            ctx.font = '30px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('PAUSED', this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()

            ctx.font = '30px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('Press ENTER to start', this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()

            ctx.font = '30px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.WIN) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()

            ctx.font = '30px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('YOU WIN!', this.gameWidth / 2, this.gameHeight / 2)
        }
    }

    togglePause() {
        if(this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.PAUSED
        }
    }
}