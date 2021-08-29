export function collisionDetect(player, gameObject) {
    if (
        player.position.x + player.width > gameObject.position.x &&
        player.position.x < gameObject.position.x + gameObject.width &&
        player.position.y + player.height > gameObject.position.y &&
        player.position.y < gameObject.position.y + gameObject.height
    ) {
        return true
    } else {
        return false
    }
}