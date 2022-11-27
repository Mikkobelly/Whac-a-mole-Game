const container = document.querySelector('#container');
const timeSelect = document.querySelector('#timeSelect');
const timeLeftDisplay = document.querySelector('#timeLeftDisplay');
const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#scoreDisplay');
const startButton = document.querySelector('#enterKey');
const pauseButton = document.querySelector('#pKey');


//setInterval functions 
let moleMoveID = null;
function moleMoveInterval() {
    moleMoveID = setInterval(moleMove, 800);
}

let timeCountID = null;
function timeCountInterval() {
    timeCountID = setInterval(timeCounter, 1000);
}


//timeCounter
let timeLeft = 15;

timeSelect.addEventListener('change', function () {
    timeLeft = parseInt(this.value);
    timeLeftDisplay.innerHTML = timeLeft;
})

function timeCounter() {
    timeLeft--;
    timeLeftDisplay.innerHTML = timeLeft;
    if (timeLeft === 0) {
        console.log(timeLeft);
        clearInterval(timeCountID);
        timeCountID = null;
        clearInterval(moleMoveID);
        moleMoveID = null;
        alert(`Congratulations! You scored ${scores}!`);
    } else if (timeLeft <= 6) {
        timeLeftDisplay.style.color = 'red';
    }
}


//make mole appear
let randNum = null;
function moleMove() {
    for (square of squares) {
        square.classList.remove("mole");
    }
    randNum = Math.floor(Math.random() * 9);
    squares[randNum].classList.add("mole");
    container.addEventListener('mousedown', addScore);
}


//score counter
let scores = 0;
function addScore(e) {
    if (e.target.id == squares[randNum].id) {
        scores++;
        scoreDisplay.textContent = scores;
        if (scores % 5 === 0) {
            var snare = new Audio('sound/snare.mp3');
            snare.play();
        }
    }
}


document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        moleMoveInterval();
        timeCountInterval();
    } else if (e.key === "p") {
        clearInterval(moleMoveID);
        moleMoveID = null;
        clearInterval(timeCountID);
        timeCountID = null;
    }
})

startButton.addEventListener('click', () => {
    moleMoveInterval();
    timeCountInterval();
})

pauseButton.addEventListener('click', () => {
    clearInterval(moleMoveID);
    moleMoveID = null;
    clearInterval(timeCountID);
    timeCountID = null;
})


