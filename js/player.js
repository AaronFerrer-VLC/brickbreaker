class Player {

    constructor(gameSize) {
        this.gameSize = gameSize

        this.playerSize = {
            width: 300,
            height: 35
        }

        this.playerPos = {
            left: this.gameSize.width / 2 - this.playerSize.width / 2,
            top: this.gameSize.height - this.playerSize.height - 40
        }

        this.playerPhysics = {
            speed: {
                left: 10
            }
        }

        this.init()
    }

    init() {
        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `black`

        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    move() {
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
    }

    moveLeft() {
        if (this.playerPos.left > 0) {
            this.playerPos.left -= this.playerPhysics.speed.left
        }
    }

    moveRight() {
        if (this.playerPos.left < this.gameSize.width - this.playerSize.width) {
            this.playerPos.left += this.playerPhysics.speed.left
        }
    }
}