export default class InputHandler {
    constructor(player, game) {
        document.addEventListener('keydown', e => {
            switch(e.key) {
                case 'w':
                    player.moveUp()
                    break

                case 'a':
                    player.moveLeft()
                    break

                case 's':
                    player.moveDown()
                    break

                case 'd':
                    player.moveRight()
                    break
            }
        })

        document.addEventListener('keyup', e => {
            switch(e.key) {
                case 'w':
                    if (player.speed.y < 0) player.stop()
                    break

                case 'a':
                    if (player.speed.x < 0) player.stop()
                    break

                case 's':
                    if(player.speed.y > 0) player.stop()
                    break

                case 'd':
                    if(player.speed.x > 0) player.stop()
                    break
            }
        })

    }
}