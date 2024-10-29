class Lives {
    constructor(gameSize) {
        this.gameSize = gameSize

        this.liveElements = []

        this.livesPos = {

            lives: [
                {
                    top: 40,
                    left: this.gameSize.width - 100
                },

                {
                    top: 90,
                    left: this.gameSize.width - 100
                },

                {
                    top: 140,
                    left: this.gameSize.width - 100
                }

            ]
        }

        this.livesSize = {
            width: 30,
            height: 30
        }


        this.init()
    }

    init() {
        this.livesPos.lives.forEach((pos) => {
            const liveElement = document.createElement('div')

            liveElement.style.position = "absolute"
            liveElement.style.width = `${this.livesSize.width}px`
            liveElement.style.height = `${this.livesSize.height}px`
            liveElement.style.top = `${pos.top}px`
            liveElement.style.left = `${pos.left}px`
            liveElement.style.backgroundColor = "green"

            document.querySelector('#game-screen').appendChild(liveElement)
            this.liveElements.push(liveElement)
        })
    }

    removeLife() {
        if (this.liveElements.length > 0) {
            const lastLifeElement = this.liveElements.pop()
            lastLifeElement.remove()
        }
    }
}
