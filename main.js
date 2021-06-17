const board = document.querySelector('.board')
const firstPlayerBtn = document.querySelector('#one-player')
const secondPlayerBtn = document.querySelector('#two-players')
const status = document.querySelector('.message')
const resetBtn = document.querySelector('#reset')
var modal = document.getElementById("container");



// const square = document.createElement('div')
let numberOfPlayers = 1
let currentPlayer = 0
let isTie = false



// *---------- arrays of winning conditions ----------------*
const winnerCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// *---------- Modal form function ----------------*
function showModal() {
    modal.style.display = "block";
  }

// *---------- Get the player choice ----------------*
  function fighterChoice() {
    if (document.getElementById("one-player").checked) {
   

      modal.style.display = "none";
    } else if (document.getElementById("two-players").checked) {
 
      modal.style.display = "none";

    } else {
      alert("You have to check one of the choices!");
    }
  }




// *---------- create the board with JavaScript insted of html ----------------*
for (let i = 0; i < 9; i++) {
    const cells = document.createElement('div')
    cells.classList.add('cells')//The classList property returns the class name(s) of an element and we create cells in this class
    cells.dataset.squareId = i
    board.appendChild(cells)//insert the cells to board element
}
const squares = Array.from(document.querySelectorAll('.cells'))//Array from is returns an Array on which you can call map, or any other Array-related functions.

console.log(squares);





//*---------- first window to take the  user choise  and give it a number "numberOfPlayers"  ----------------*
//*---------- one player button ----------------*
firstPlayerBtn.addEventListener("click", () => {
    reset();
    numberOfPlayers = 1
    status.innerText = "Your turn"
    
})
// *---------- two player button ----------------*
secondPlayerBtn.addEventListener("click", () => {
    reset();
    numberOfPlayers = 2
    status.innerText = "Player One turn"
})





// *----------  if one player, play with computer ----------------*
function firstPlayer(e) {
    e.target.classList.add('player-one')// add player-one that is in css sheet at the index of the cell array to know which cells clicked by first player
    checkForWinner()
    if(!isTie) {// if the game is continued then return
        const emptyCells = squares.filter (cells => { // returns all the indexes that does not clicked yet and does not contain 'player-two' and 'player-one' in cells array
            return !cells.classList.contains('player-one') && !cells.classList.contains('player-two')
         
        })
        console.log(emptyCells)
        if (emptyCells.length !== 0) {//return the lenght of all emptyCells that does not clicked and the next player will start his turn

            status.innerText = "Computers turn"
            computer(emptyCells)
            checkForWinner() 
        } else {// if the lenght is ==0 and all empty cell has choosen then the game ended in a tie
            status.innerText = "Game ended in a tie!"
           isTie = true//game over
        }
    }
}
// *---------- computer player ----------------*
function computer(emptyCells) {
   
    setTimeout(() => {
        let random = Math.round(Math.random() * (emptyCells.length-1) /* -1 means empty cells not empty */ )
        if (random === -1) random += 1 
        emptyCells[random].classList.add('player-two')
        status.innerText = "Your turn"
    }, 1000)
    
}

// *---------- if two players, take it in turns to play ----------------*
function  secondPlayers(e) {
  
    if (currentPlayer % 2 === 0) {
        e.target.classList.add('player-one')
        status.innerText ="Player One turn"
        checkForWinner()
        } else {
            e.target.classList.add('player-two')
           
            status.innerText =  "Player Two turn"
            checkForWinner()
        } 
        currentPlayer ++
        if (currentPlayer === squares.length  && isTie === false) {
            status.innerText = "Game ended in a tie!"
            isTie = true
        }
}
// *---------- check for a winning combination ----------------*
function checkForWinner() {
    winnerCond.forEach(combination => {
 //every () a test to run on every element in an winnerCond array, and it keeps track of whether the 3 first indexs of winnerCond has 'player-one' or not and return true or false.
        if (combination.every(index => squares[index].classList.contains('player-one'))) {
      
            status.innerText = "Player One wins!"
            isTie = true //game over and stop clicking in the cells
        } else if (combination.every(index => squares[index].classList.contains('player-two'))) {
            status.innerText = "Player Two wins!"
            isTie = true
        } 
    })
}


// *---------- reset the game ----------------*
function reset() {
    squares.forEach(cells => {
        cells.classList.remove('player-one')
        cells.classList.remove('player-two')
        status.innerText = "Your turn"
        if (numberOfPlayers === 2) status.innerText = "Player One turn"
        currentPlayer = 0
        isTie = false
    })
}

// *------------------------------------------------ Listeners Part  -------------------------------------------*

// *----- create event listener for cells -----------*
document.addEventListener("click", e => { // listener to the cells click if the user begin the game
    if (isTie === true)
    
    
    // mean if the game is tie stop click
    return 
    // count the clicks only in the cells and ignore all buttons in the page and it's not counted in this game 
    if (!e.target.matches('.cells')) return //when you remove this command it will count every button in the page as a cell and your turn counted
    
    if (e.target.matches('.player-one')) {//if the player one click for specific cell then the other player connot click at the same cell again
        console.log(e)
 
    return   }

    if (e.target.matches('.player-two'))//if the player one click for specific cell then the other player connot click at the same cell again
    {

      
         console.log(e)
        return
    }
    
    if(numberOfPlayers === 1){// if the 'numberOfPlayers==1' which is first player click on the first cell then call firstPlayer(e) with index of that cell
        firstPlayer(e)
    } 
    if(numberOfPlayers === 2){
        secondPlayers(e)
    } 
})

// *---------- event listener for reset button ----------------*
resetBtn.addEventListener("click", reset)


document.getElementById("start-btn").addEventListener("click", fighterChoice);

