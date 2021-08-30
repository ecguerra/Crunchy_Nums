import Square from './square.js'

export default class Level {
    constructor(game, level) {
        this.game = game
        this.level = level
        this.enemies = level.enemies
        this.answerNum = level.answerNum
        this.scopeNum = level.scopeNum
        this.totalAnswers = 0
    }

    resetLevel() {
        this.totalAnswers = 0
        this.game.totalAnswers = 0
        this.game.enemies = []
        this.game.squares = []
    }

    buildLevel() {
        this.resetLevel()

        for(let j=0; j<5; j++) {
            for(let i=0; i<6; i++){
                let option = Math.ceil(Math.random()*this.scopeNum)
                this.game.squares.push(
                    new Square(
                        this.game, 
                        {x: i * this.game.gameWidth/6, y: j * this.game.gameHeight/5}, 
                        option
                    )
                )

                if(option % this.answerNum === 0) this.totalAnswers++
            }
        }

        // if there are fewer than 10 squares with correctAnswer: true, rebuild level
        console.log('numAnswer: ', this.totalAnswers)
        if(this.totalAnswers < 10){
            this.buildLevel()
        } 


        
    }
}