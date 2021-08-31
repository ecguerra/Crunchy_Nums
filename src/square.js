import { collisionDetect  } from './collisionDetect.js'

export default class Square {
    constructor(game, position, value) {
        this.game = game
        this.position = position
        this.width = game.gameWidth / 6
        this.height = game.gameHeight / 5
        this.value = value
        this.display = true
        this.correctAnswer = false
    }

    update() {
        if(this.game.currentLevel === this.game.levels.length) return
        if(this.value % this.game.levels[this.game.currentLevel].answerNum === 0) {
            this.correctAnswer = true
        }

        if(collisionDetect(this.game.player, this) && this.game.player.chomp) {
            this.display = false
            if(this.correctAnswer) {
                this.game.points += 10
                this.game.totalAnswers--
            } else {
                this.game.lives--
            }
        }

    }

    draw(ctx) {
        ctx.strokeStyle = '#BA55D3'
        ctx.lineWidth = 3
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
        ctx.font = '1.2rem "Press Start 2P"'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(
            this.value, 
            this.position.x + this.width/2, 
            this.position.y + this.height/2 + 10
        )
    }
}