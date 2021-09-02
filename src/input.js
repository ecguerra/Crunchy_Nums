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

                case ' ':
                    player.crunch()
                    break

                case 'Escape':
                    game.togglePause()
                    break
                
                case 'Enter':
                    game.start()
                    break
                
                case 'r':
                    game.openRules()
                    break
            }
        })

        document.addEventListener('keyup', e => {
            switch(e.key) {
                case 'w':
                    if (player.speed.y < 0) player.stopY()
                    break

                case 'a':
                    if (player.speed.x < 0) player.stopX()
                    break

                case 's':
                    if(player.speed.y > 0) player.stopY()
                    break

                case 'd':
                    if(player.speed.x > 0) player.stopX()
                    break
                
                case ' ':
                    player.crunch()
                    break

            }
        })

    }
}