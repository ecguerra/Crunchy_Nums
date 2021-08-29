export default class Square {
    constructor(game, position, value) {
        this.game = game
        this.position = position
        this.width = 133 // 798
        this.height = 120 // 600
        this.value = value
    }

    update() {
        // TBD
    }

    draw(ctx) {
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)

        ctx.font = '30px Arial'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.fillText(this.value, this.width / 2, this.height / 2 + 10)
    }
}