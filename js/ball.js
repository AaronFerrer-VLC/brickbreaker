class Ball {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.ballSize = {
            width: 40,
            height: 40
        }

        this.ballPos = {
            left: this.gameSize.width / 2 - this.ballSize.width / 2,
            top: this.gameSize.height - 117
        }

        //this.resetBallPosition()

        this.ballPhysics = {
            speed: {
                top: 6,
                left: 2
            }
        }

        this.init()

    }

    init() {
        this.ballElement = document.createElement('div')

        this.ballElement.style.position = "absolute"
        this.ballElement.style.width = `${this.ballSize.width}px`
        this.ballElement.style.height = `${this.ballSize.height}px`
        this.ballElement.style.left = `${this.ballPos.left}px`
        this.ballElement.style.top = `${this.ballPos.top}px`
        this.ballElement.style.backgroundColor = "blue"
        this.ballElement.style.borderRadius = '50%'

        document.querySelector('#game-screen').appendChild(this.ballElement)
    }

    move() {


        if (this.ballPos.left >= this.gameSize.width - this.ballSize.width) {
            this.turnHorizontal()
        }

        if (this.ballPos.left <= 0) {
            this.turnHorizontal()
        }

        if (this.ballPos.top <= 0) {
            this.turnVertical()
        }

        if (this.ballPos.top >= this.gameSize.height - this.ballSize.height) {
            this.turnVertical()
        }

        this.ballPos.top += this.ballPhysics.speed.top
        this.ballPos.left += this.ballPhysics.speed.left

        this.ballElement.style.top = `${this.ballPos.top}px`
        this.ballElement.style.left = `${this.ballPos.left}px`

    }

    turnHorizontal() {
        this.ballPhysics.speed.left *= -1
    }

    turnVertical() {
        this.ballPhysics.speed.top *= -1
    }

    // returnBallPosition() {
    //     this.ballPos = { ...this.originalPos }
    //     this.updateBallElementPosition()
    // }
}