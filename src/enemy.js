import { collisionDetect } from './collisionDetect.js'

const loseLife = new Audio("../assets/loseLife.wav")

export default class Enemy {
    constructor(game, speed, position) {
        this.game = game
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.image = document.getElementById("enemy_img")
        this.width = game.gameWidth / 8
        this.height = game.gameHeight / 7
        this.speed = speed
        this.position = position
    }

    draw(ctx) {
        // ctx.fillStyle = '#FF5733'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(this.image,this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        // left/right
        if(this.position.x < 0 || this.position.x + this.width > this.gameWidth) {
            this.speed.x = -this.speed.x
        }
        
        // top/bottom
        if(this.position.y < 0 || this.position.y + this.height > this.gameHeight) {
            this.speed.y = -this.speed.y
        }
        
        // collision with player
        if(collisionDetect(this.game.player, this)) {
            loseLife.play()
            this.game.player.reset()
            this.game.lives--
        }
    }


}