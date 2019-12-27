class Board {
    constructor() {

    }

    clearBoard() {
        const divs = document.querySelectorAll(".container div");
        divs.forEach(div => div.remove());
        array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    createBoard(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        for (let i = 0; i < rows; i++) {
            let row = document.createElement("div")
            row.className = "row"
            container.appendChild(row);
            for (let j = 0; j < cols; j++) {
                let col = document.createElement("div");
                col.className = "col"
                row.appendChild(col);
                let pic = document.createElement("img");
                pic.addEventListener("click", this.flipCard.bind(this));
                pic.src = `./images/card.png`;
                col.appendChild(pic);
            }
        }
    }

    createBoardByDifficulty(e) {
        switch (e.target.value) {
            case "easy": gameBoard.clearBoard(); gameBoard.createBoard(3, 4);
                break;
            case "medium": gameBoard.clearBoard(); gameBoard.createBoard(4, 5);
                break;
            case "hard": gameBoard.clearBoard(); gameBoard.createBoard(4, 6);
                break;
            default: gameBoard.clearBoard(); gameBoard.createBoard(3, 4);
                break;
        }
    }

    flipCard(e) {
        score += 10;
        scoreDiv.innerHTML = `Score ${score}`;



        // clicks = 1;
        if (clicks === 1) {
            this.e1 = e;
            clicks++;
        }
        else if (clicks === 2) {
            this.e2 = e;
            if (this.checkPairs()) {
                score += 30;
            }
            else {
                score -= 10;

                if (retries > 1) {
                    retries--;
                    retriesDiv.innerHTML = `Retries ${retries}`;
                }
                else {
                    console.log("game over")
                }

            }
            clicks = 1;
        }
        else {
            console.log("error");
        }

        // console.log(score);



        let random = this.randomPicNumberPairs(this.rows, this.cols);
        e.target.id = random;
        e.target.src = `./images/pokemon/${random}.png`;
    }

    checkPairs() {
        console.log(this.e1.target.id);
        console.log(this.e2.target.id);
        return false;
    }
    randomPicNumberPairs(rows, cols) {
        let numOfPics = rows * cols / 2;
        const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let y = parseInt(Math.random() * (numOfPics));
        if (array2[y] === 0) {
            array2[y]++;
            return array1[y];
        }
        else if (array2[y] === 1) {
            array2[y]++;
            return array1[y];
        }
        else if (array2[y] === 2) {
            return this.randomPicNumberPairs(rows, cols);
        }
        else {
            console.log("error")
        }
    }




}

const toggleClass = (element, classes) => {
    console.log(element.classList)
    if (element.classList.forEach(_class => _class === _class))
        element.classList.remove(classes)
    else
        element.classList.add(classes)
}



let array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const gameBoard = new Board;
const difficulty = document.querySelectorAll(".difficulty");
const container = document.querySelector(".container");
const scoreDiv = document.querySelector(".score");
const retriesDiv = document.querySelector(".retries");

let retries = 5;
let score = 0;
let clicks = 1;
retriesDiv.innerHTML = `Retries ${retries}`;
scoreDiv.innerHTML = `Score ${score}`;

// const nameInput = document.querySelector(".name");
difficulty.forEach(item => item.addEventListener("click", gameBoard.createBoardByDifficulty));
gameBoard.createBoard(3, 4);


