


class Board {
    constructor() {

    }

    clearBoard() {
        const divs = document.querySelectorAll(".container div");
        divs.forEach(div => div.remove());
        array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                let pic = document.createElement("img");
                pic.src = `./images/pokemon/${randomPicNumberPairs(rows, cols)}.png`;
                col.appendChild(pic);
            }
        }
    }


    createBoardByDifficulty(e) {
        switch (e.target.value) {
            case "easy": gameBoard.clearBoard(); gameBoard.createBoard(3, 4);
                break;
            case "medium":gameBoard.clearBoard();gameBoard.createBoard(4, 5);
                break;
            case "hard": gameBoard.clearBoard(); gameBoard.createBoard(4, 6);
                break;
            default: gameBoard.clearBoard(); gameBoard.createBoard(3, 4);
                break;
        }
    }
}
const randomPicNumberPairs = (rows, cols) => {
    let numOfPics = rows * cols /2  ;
    console.log(numOfPics)
    const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let y = parseInt(Math.random() * (numOfPics) );
    if (array2[y] === 0) {

        array2[y]++;
        return array1[y];
    }
    else if (array2[y] === 1) {
        array2[y]++;
        console.log(array2);
        console.log(array1[y])
        return array1[y];
    }
    else if (array2[y] === 2) {
        return randomPicNumberPairs(rows, cols);
    }
    else {
        console.log("error")
    }



}


let array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const gameBoard = new Board;
const difficulty = document.querySelectorAll(".difficulty");
const container = document.querySelector(".container");
difficulty.forEach(item => item.addEventListener("click", gameBoard.createBoardByDifficulty));
gameBoard.createBoard(3, 4);
