const Game = {

    name: "Brick breaker",
    author: "Aaron y Pedro",
    version: "1.0",
    license: undefined,

    ball: undefined,
    player: undefined,
    bricks: [],
    bricksDestroyed: 0,
    lives: 3,
    lostLives: 0,

    keys: {
        LEFT: "ArrowLeft",
        RIGHT: "ArrowRight",
        SPACE: "Space"
    },

    pressedKeys: {
        LEFT: false,
        RIGHT: false,
        SPACE: false
    },

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    init() {
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
    },

    start() {
        this.createElements()
        this.setEventListeners()

    },

    createElements() {
        this.player = new Player(this.gameSize)
        this.ball = new Ball(this.gameSize, this.player.playerPos)
        this.lives = new Lives(this.gameSize, this.lives)
        this.createBricks()
    },

    createBricks() {

        bricksData.forEach(eachBrick => {
            this.bricks.push(new Bricks(this.gameSize, eachBrick))
        })
    },

    setEventListeners() {
        document.onkeydown = event => {
            if (event.code === this.keys.LEFT) this.pressedKeys.LEFT = true
            if (event.code === this.keys.RIGHT) this.pressedKeys.RIGHT = true
            if (event.code === this.keys.SPACE) this.startGameLoop()
        }

        document.onkeyup = event => {
            if (event.code === this.keys.LEFT) this.pressedKeys.LEFT = false
            if (event.code === this.keys.RIGHT) this.pressedKeys.RIGHT = false
        }
    },

    startGameLoop() {
        if (!this.gameLoop) {
            this.gameLoop = setInterval(() => {
                this.moveAll()
            }, 10)
        }
    },

    moveAll() {
        if (this.pressedKeys.LEFT) this.player.moveLeft()
        if (this.pressedKeys.RIGHT) this.player.moveRight()

        this.ball.move()
        this.player.move()

        this.checkCollisionWithPlayer()

        this.checkCollisionWithBricks()
    },

    checkCollisionWithPlayer() {
        const ballBottom = this.ball.ballPos.top + this.ball.ballSize.height
        const playerTop = this.player.playerPos.top
        const ballCenter = this.ball.ballPos.left + this.ball.ballSize.width / 2

        if (
            ballBottom >= playerTop &&
            ballCenter > this.player.playerPos.left &&
            ballCenter < this.player.playerPos.left + this.player.playerSize.width
        ) {
            this.ball.turnVertical()
        } else if (ballBottom >= this.gameSize.height) {
            this.lives.removeLife()
            this.resetBallAndPlayerPositions()

            if (this.lives.liveElements.length === 0) {
                alert("GAME OVER")
                location.reload()
            } else {
                alert("YOU HAVE LOST A LIFE")
            }
        }
    },

    resetBallAndPlayerPositions() {

        this.ball.ballPos.top = this.gameSize.height - 117
        this.ball.ballPos.left = this.gameSize.width / 2 - this.ball.ballSize.width / 2

        this.player.playerPos.left = this.gameSize.width / 2 - this.player.playerSize.width / 2
    },

    // resetAllElements() {
    //     this.ball.ballPos.top = this.gameSize.height - 117
    //     this.ball.ballPos.left = this.gameSize.width / 2 - this.ball.ballSize.width / 2

    //     this.player.playerPos.left = this.gameSize.width / 2 - this.player.playerSize.width / 2


    // },

    checkCollisionWithBricks() {
        const ballTop = this.ball.ballPos.top
        const ballBottom = ballTop + this.ball.ballSize.height
        const ballLeft = this.ball.ballPos.left
        const ballRight = ballLeft + this.ball.ballSize.width

        this.bricks.forEach((brick, index) => {
            const brickTop = brick.brickSpecs.top
            const brickBottom = brickTop + brick.bricksSize.height
            const brickLeft = brick.brickSpecs.left
            const brickRight = brickLeft + brick.bricksSize.width

            if (
                ballBottom >= brickTop && ballTop <= brickBottom &&
                ballRight >= brickLeft && ballLeft <= brickRight
            ) {

                this.ball.turnVertical()
                brick.brickElement.remove()
                this.bricks.splice(index, 1)
            }

        })

        if (this.bricks.length === 0) {
            alert("YOU WIN")
            location.reload()
        }
    }

}