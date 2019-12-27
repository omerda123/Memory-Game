class Board {
    constructor() {

    }

    clearBoard() {
        const divs = document.querySelectorAll(".container div");
        divs.forEach(div => div.remove());
        this.array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameOver.style.display = "none";
        winner.style.display = "none"
        this.changeScore("init")
        this.changeRetries("init")
        this.numberOfPairs = 0;
    }

    initGame(rows, cols) {
        this.clearBoard();
        this.numOfPics = rows * cols / 2;
        this.rows = rows;
        this.cols = cols;
        let picId = 1;
        for (let i = 0; i < rows; i++) {
            let row = document.createElement("div")
            row.className = "row"
            container.appendChild(row);
            for (let j = 0; j < cols; j++) {
                let col = document.createElement("div");
                col.className = "col"
                row.appendChild(col);
                let card = document.createElement("img");
                card.addEventListener("click", this.flipCard.bind(this));
                card.src = `./images/card.png`;
                let img = document.createElement("img");
                let random = this.randomPicNumberPairs(this.rows, this.cols);
                img.src = `./images/pokemon/${random}.png`;
                img.className = random;
                img.id = picId;
                card.className = random;
                card.id = picId++;
                img.style.display = "none";
                col.appendChild(card);
                col.appendChild(img);
            }
        }
    }

    createBoardByDifficulty(e) {
        gameBoard.clearBoard();
        switch (e.target.value) {
            case "easy": gameBoard.initGame(3, 4);
                break;
            case "medium": gameBoard.initGame(4, 5);
                break;
            case "hard": gameBoard.initGame(4, 6);
                break;
            default: gameBoard.initGame(3, 4);
                break;
        }
    }

    changeScore(amount) {
        if (amount === "init") {
            this.score = 0;
        }
        else {
            this.score = this.score + amount;
        }
        scoreDiv.innerHTML = `Score <h1> ${this.score} <h1/>`;
    }

    changeRetries(amount) {
        if (amount === "init") {
            this.retries = 5;
        }
        else {
            this.retries = this.retries + amount;
        }
        retriesDiv.innerHTML = `Retries <h1> ${this.retries} <h1/>`;
    }




    flipCard(e) {
        e.target.style.display = "none";
        document.querySelectorAll(`[id='${e.target.id}']`)[1].style.display = "block";
        this.changeScore(10);

        if (clicks === 1) {
            this.e1 = e;
            clicks++;
        }
        else if (clicks === 2) {
            this.e2 = e;
            if (this.checkPairs()) {
                this.changeScore(30);
                document.querySelectorAll(`[id='${this.e1.target.id}']`)[1].style.display = "block";
                document.querySelectorAll(`[id='${this.e2.target.id}']`)[1].style.display = "block";
                this.numberOfPairs++;
                if (this.numberOfPairs === this.numOfPics)
                    winner.style.display = "block"
            }
            else {
                this.changeScore(-20);
                setTimeout(() => {
                    document.querySelectorAll(`[id='${this.e1.target.id}']`)[0].style.display = "block";
                    document.querySelectorAll(`[id='${this.e1.target.id}']`)[1].style.display = "none";
                    document.querySelectorAll(`[id='${this.e2.target.id}']`)[0].style.display = "block";
                    document.querySelectorAll(`[id='${this.e2.target.id}']`)[1].style.display = "none";

                }, 500)
                if (this.retries > 1) {
                    this.changeRetries(-1);
                }
                else {
                    gameOver.style.display = "block";
                }

            }
            clicks = 1;
        }
        else {
            console.log("error")
        }
    }
    checkPairs() {
        if (this.e1.target.className === this.e2.target.className)
            return true;
        else
            return false;
    }

    randomPicNumberPairs(rows, cols) {
        const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let y = parseInt(Math.random() * (this.numOfPics));
        if (this.array2[y] === 0) {
            this.array2[y]++;
            return array1[y];
        }
        else if (this.array2[y] === 1) {
            this.array2[y]++;
            return array1[y];
        }
        else if (this.array2[y] === 2) {
            return this.randomPicNumberPairs(rows, cols);
        }
        else {
            console.log("error")
        }
    }
}




const gameBoard = new Board;
const difficulty = document.querySelectorAll(".difficulty");
const container = document.querySelector(".container");
const scoreDiv = document.querySelector(".score");
const retriesDiv = document.querySelector(".retries");
const nameInput = document.querySelector("#name");
const playAgain = document.querySelector(".play-again");
const gameOver = document.querySelector(".game-over")
const winner = document.querySelector(".winner")



playAgain.addEventListener("click", () => gameBoard.initGame(3, 4));
let clicks = 1;

nameInput.addEventListener("focusout", () => {
    document.querySelector(".name").className = "name"
    document.querySelector(".name").innerHTML = `Hello ${nameInput.value}, welcome to the game`
    nameInput.style.display = "none";
    document.querySelector(".winner-upper").innerHTML = `Good Job ${nameInput.value}, you've made it`
    document.querySelector(".winner-lower").innerHTML = `You are going to enter the scoreboard! <div class="winner-play-again"> Play again? </div>`
    const winnerPlayAgain = document.querySelector(".winner-play-again");
    winnerPlayAgain.addEventListener("click", () => gameBoard.initGame(3, 4))

})

difficulty.forEach(item => item.addEventListener("click", gameBoard.createBoardByDifficulty));
gameBoard.initGame(3, 4);


