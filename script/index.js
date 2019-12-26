
const container = document.querySelector(".container");


class Board {
    constructor() {

    }

    clearBoard() {
        const divs = document.querySelectorAll(".container div");
        divs.forEach(div => div.remove());
    }

    createBoard(rows, cols) {
        for (let i = 0; i < rows; i++) {
            let row = document.createElement("div")
            row.className = "row"
            container.appendChild(row);
            for (let j = 0; j < cols; j++) {
                let col = document.createElement("div");
                col.className = "col"
                row.appendChild(col);
            }
        }
    }
}

const gameBoard = new Board;
gameBoard.createBoard(3, 4);


const difficulty = document.querySelectorAll(".difficulty");
difficulty.forEach(item => item.addEventListener("click", (e) => {
    console.log(e.target.value);
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
}))
console.log(difficulty);