class Bricks {
    constructor(gameSize, brickSpecs) {

        this.gameSize = gameSize

        this.brickSpecs = brickSpecs

        this.bricksSize = {
            width: 90,
            height: 45
        }

        this.init()
    }

    init() {
        this.brickElement = document.createElement('div')

        this.brickElement.style.position = "absolute"
        this.brickElement.style.width = `${this.bricksSize.width}px`
        this.brickElement.style.height = `${this.bricksSize.height}px`
        this.brickElement.style.top = `${this.brickSpecs.top}px`
        this.brickElement.style.left = `${this.brickSpecs.left}px`
        this.brickElement.style.backgroundColor = "red"

        document.querySelector('#game-screen').appendChild(this.brickElement)

    }
}