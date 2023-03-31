//Constants
const XLetter = 'X';
const OLetter = 'O';
const eitherXorO = ['X', 'O'];

let currentValue = null;
let turns = 0;
let boxes = [];

let startButton = null;
let playerOne = null;
let playerTwo = null;

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

//DOM Selectors
const body = document.querySelector('body');
const playerElem = document.createElement('p');
//Variables
let title = document.getElementById('title');
let clearBtn = document.getElementById('clearBtn');
let playerFeedbackEl = null;

// playerFeedback area

function createPlayerFeedbackContainer() {
	playerFeedbackEl = document.createElement('div');

	playerFeedbackEl.classList.add('players-feedback');
	body.appendChild(playerFeedbackEl);
}
// create Title
function createTitle() {
	const titleH1 = document.createElement('h1');
	titleH1.id = 'title';
	titleH1.innerText = 'Tic-Tac-Toe';
	body.appendChild(titleH1);
}
// Create Game  Board
function createGameBoard() {
	const gameBoardEl = document.createElement('main');

	gameBoardEl.setAttribute('id', 'gameboard');
	gameBoardEl.innerHTML = `
    <div class="box" data-index="0"></div>
    <div class="box" data-index="1"></div>
    <div class="box" data-index="2"></div>
    <div class="box" data-index="3"></div>
    <div class="box" data-index="4"></div>
    <div class="box" data-index="5"></div>
    <div class="box" data-index="6"></div>
    <div class="box" data-index="7"></div>
    <div class="box" data-index="8"></div>
    `;

	body.appendChild(gameBoardEl);
}

function playerInputArea() {
	const playerNames = document.createElement('div');

	playerNames.setAttribute('id', 'playerNames');

	playerNames.innerHTML = `
    <input placeholder="Player 1 Name" id='player-one' />
    <input placeholder="Player 2 Name" id='player-two' />
    <button id='btn-start'>Start Game</button>
    `;

	body.appendChild(playerNames);
	startButton = document.querySelector('#btn-start');
	playerOne = document.querySelector('#player-one');
	playerTwo = document.querySelector('#player-two');
}

// check Winner
function checkWinner(WINNING_COMBINATIONS, boxes) {
	console.log('boxes', boxes);

	for (let combination of WINNING_COMBINATIONS) {
		const [a, b, c] = combination;
		console.log(a);
		console.log(b);
		console.log(c);

		if (
			boxes[a].dataset.mark &&
			boxes[a].dataset.mark === boxes[b].dataset.mark &&
			boxes[a].dataset.mark === boxes[c].dataset.mark
		) {
			return true;
		}
	}

	return false;
}

const main = () => {
	createTitle();
	createGameBoard();
	playerInputArea();
	createPlayerFeedbackContainer();

	// game starts
	const index = zeroOrOne();

	currentValue = eitherXorO[index];

	// select all the boxes
	boxes = document.querySelectorAll('.box'); // making all the boxes as an Array
	console.log(boxes.length);

	// boxes.forEach();

	for (let index = 0; index < boxes.length; index++) {
		boxes[index].addEventListener('click', boxClickHandler);
	}

	startButton.addEventListener('click', startGame);
};

function boxClickHandler(event) {
	// const dataIndex = +event.target.getAttribute('data-index');

	if (playerOne.value === '' && playerTwo.value === '') {
		alert('Please enter players names');
		return;
	}
	const box = event.target;

	if (box.innerText.length === 1) {
		return;
	}

	if (turns === 0) {
		box.innerText = currentValue;
	} else {
		// oppostie value

		currentValue = currentValue === 'X' ? 'O' : 'X';
		box.innerText = currentValue;
	}

	// checking Winner here
	box.dataset.mark = currentValue;
	// box.textContent

	if (checkWinner(WINNING_COMBINATIONS, boxes)) {
		setTimeout(() => {
			alert(`${currentValue} wins`);
			location.reload();
		}, 100); // 1/10 of one second
	} else {
		// just do nothing...
	}
	turns++;
}

function startGame() {
	const firstPlayerName = playerOne.value;
	const secondPlayerName = playerTwo.value;

	playerFeedbackEl.innerHTML = `
    <p>${firstPlayerName} : ${currentValue}</p>
    <p>${secondPlayerName} : ${currentValue === 'X' ? 'O' : 'X'}</p>
    `;
}

// Utility function
function zeroOrOne() {
	return Math.random() < 0.5 ? 0 : 1;
}

// The MAIN function
main();
