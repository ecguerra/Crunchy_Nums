export default class Player {
    constructor(game) {
        this.game = game
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.width = 30
        this.height = 30
        this.maxSpeed = 5
        this.speed = {x: 0, y: 0}
        this.position = {x: 50, y: 50}
        this.chomp = false
    }

    stopX() {
        this.speed = {x: 0, y: this.speed.y}
    }

    stopY() {
        this.speed = {x: this.speed.x, y: 0}
    }

    moveRight() {
        this.speed.x = this.maxSpeed
    }

    moveLeft() {
        this.speed.x = -this.maxSpeed
    }

    moveDown() {
        this.speed.y = this.maxSpeed
    }

    moveUp() {
        this.speed.y = -this.maxSpeed
    }

    crunch() {
        this.chomp = !this.chomp
    }

    reset() {
        this.position = {x: 50, y: 50}
    }

    draw(ctx) {
        ctx.fillStyle = 'chartreuse'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        // left/right
        if(this.position.x < 0) this.position.x = 0
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width
        
        // top/bottom
        if(this.position.y < 0) this.position.y = 0
        if(this.position.y + this.height > this.gameHeight) this.position.y = this.gameHeight - this.height
        
    }


}