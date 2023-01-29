let playerBlue = "B";
let playerYellow = "Y";
let currPlayer = playerBlue;

let isGameEnding = false;
let board;

let rows = 6;
let columns = 7;
let currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    StartOfGame();
}

function StartOfGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            
            row.push(' ');
            
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", addPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function addPiece() {
    if (isGameEnding) {
        return;
    }

    //get coordinate of that tile clicked
    let coordinate = this.id.split("-");
    let r = parseInt(coordinate[0]);
    let c = parseInt(coordinate[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    console.log(board[r][c]);
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerBlue) {
        tile.classList.add("blue-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerBlue;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerBlue) {
        winner.style.fontSize="4rem"
        winner.innerText = "Blue win";
        document.body.style.backgroundColor="#23395d"             
        document.body.style.color="white"     
        winner.style.transition='4s'        
    } else { 
        winner.innerText = "Yellow Wins";
        document.body.style.backgroundColor="#E9B944"
        winner.style.fontSize="4rem"             
        document.body.style.color="white" 
        winner.style.transition='4s'     }
    isGameEnding = true;
}