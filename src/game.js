import Player from './player.js'
import Enemy from './enemy.js'
import InputHandler from './input.js'
import Level from './level.js'

const levelNum = document.getElementById('level-num')
const factorNum = document.getElementById('factor-num')
const scoreNum = document.getElementById('score-num')
const livesNum = document.getElementById('lives-num')

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
                answerNum: Math.ceil(Math.random() * 9) + 1,
                enemies: [
                    new Enemy(this, {x: 1, y: 0}, {x: 0, y: 125}), 
                    new Enemy(this, {x: -1, y: 0}, {x: 450, y: 325})
                ],
                scopeNum: 100
            }),
            new Level(this, {
                answerNum: Math.ceil(Math.random() * 11) + 1,
                enemies: [
                    new Enemy(this, {x: 0, y: 2}, {x: 133, y: 0}), 
                    new Enemy(this, {x: 0, y: -2}, {x: 483, y: 400})
                ],
                scopeNum: 144
            }),
            new Level(this, {
                answerNum: Math.ceil(Math.random() * 14) + 1,
                enemies: [
                    new Enemy(this, {x: -2, y: -2}, {x: 483, y: 400})
                ],
                scopeNum: 225
            })
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
        factorNum.innerText = `Find multiples of ${this.levels[this.currentLevel].answerNum}`

        this.totalAnswers = this.levels[this.currentLevel].totalAnswers
        this.levels[this.currentLevel].enemies.forEach(enemy => this.enemies.push(enemy))
        this.gameObjects = [this.player, ...this.enemies]
        this.gamestate = GAMESTATE.RUNNING
    }
    
    update(deltaTime) {
        if(this.gamestate == GAMESTATE.RUNNING) {
            levelNum.innerText = `Level: ${this.currentLevel + 1}`
            scoreNum.innerText = `Score: ${this.points}`
            livesNum.innerText = `Lives: ${this.lives}`
        } 

        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER
        if(this.gamestate !== GAMESTATE.RUNNING) return

        if(this.totalAnswers === 0) {
            this.currentLevel++

            if(this.currentLevel === this.levels.length) {
                this.gamestate = GAMESTATE.WIN
            } else {
                this.gamestate = GAMESTATE.NEWLEVEL
                this.player.reset()
                this.squares = []
                this.enemies = []
            }
        }

        if(this.points === 100) {
            this.lives++
            this.points=0
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

            ctx.font = '1.8rem "Press Start 2P"'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('PAUSED', this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()

            ctx.font = '1.7rem "Press Start 2P"'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('Press ENTER to start', this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()
            ctx.font = '1.8rem "Press Start 2P"'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2)
        }

        if(this.gamestate === GAMESTATE.NEWLEVEL) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()
            ctx.font = '1.6rem "Press Start 2P"'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText('Level Complete!', this.gameWidth / 2, this.gameHeight / 2 - 25)
            ctx.fillText('Press ENTER to continue', this.gameWidth / 2, this.gameHeight / 2 + 25)
        }

        if(this.gamestate === GAMESTATE.WIN) {
            ctx.rect(0,0, this.gameWidth,this.gameHeight)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()
            ctx.font = '1.8rem "Press Start 2P"'
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


    // in DOM instead?
    playAgain() {
        this.currentLevel = 0
        this.points = 0
    }
}