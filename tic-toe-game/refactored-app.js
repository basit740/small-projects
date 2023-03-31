// Constants
const X_LETTER = 'X';
const O_LETTER = 'O';
const MARKERS = [X_LETTER, O_LETTER];
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

// DOM selectors
const body = document.querySelector('body');
const gameBoardEl = document.createElement('main');
const playerFeedbackEl = document.createElement('div');
const playerOneInput = document.createElement('input');
const playerTwoInput = document.createElement('input');
const startButton = document.createElement('button');
const clearButton = document.createElement('button');

// Variables
let currentValue = null;
let turns = 0;
let boxes = [];

// Functions
const zeroOrOne = () => Math.floor(Math.random() * 2);
const createPlayerFeedbackContainer = () => {
	playerFeedbackEl.classList.add('players-feedback');
	body.appendChild(playerFeedbackEl);
};
const createTitle = () => {
	const titleH1 = document.createElement('h1');
	titleH1.id = 'title';
	titleH1.textContent = 'Tic-Tac-Toe';
	body.appendChild(titleH1);
};
const createGameBoard = () => {
	gameBoardEl.setAttribute('id', 'gameboard');
	gameBoardEl.innerHTML = [...Array(9)]
		.map((_, i) => `<div class="box" data-index="${i}"></div>`)
		.join('');
	body.appendChild(gameBoardEl);
};
const updatePlayerFeedback = (players) => {
	playerFeedbackEl.innerHTML = Object.entries(players)
		.map(([key, value]) => `<p>${key}: ${value}</p>`)
		.join('');
};
const checkWinner = (combinations, boxes) =>
	combinations.some(
		([a, b, c]) =>
			boxes[a].dataset.mark &&
			boxes[a].dataset.mark === boxes[b].dataset.mark &&
			boxes[a].dataset.mark === boxes[c].dataset.mark
	);
const boxClickHandler = (event) => {
	if (!playerOneInput.value || !playerTwoInput.value) {
		alert('Please enter player names');
		return;
	}
	const box = event.target;
	if (box.innerText.length === 1) return;
	box.innerText = currentValue;
	box.dataset.mark = currentValue;
	if (checkWinner(WINNING_COMBINATIONS, boxes)) {
		setTimeout(() => {
			alert(`${currentValue} wins`);
			location.reload();
		}, 100);
	} else {
		currentValue = MARKERS[+!MARKERS.indexOf(currentValue)];
	}
	turns++;
};
const startGame = () => {
	const players = {
		[playerOneInput.value]: MARKERS[zeroOrOne()],
		[playerTwoInput.value]: MARKERS[+!MARKERS.indexOf(currentValue)],
	};
	updatePlayerFeedback(players);
};

// Main function
const main = () => {
	createTitle();
	createGameBoard();
	createPlayerFeedbackContainer();

	boxes = Array.from(document.querySelectorAll('.box'));
	currentValue = MARKERS[zeroOrOne()];
	startButton.textContent = 'Start Game';
	clearButton.textContent = 'Clear Board';
	playerOneInput.placeholder = 'Player 1 Name';
	playerTwoInput.placeholder = 'Player 2 Name';

	body.append(playerOneInput, playerTwoInput, startButton, clearButton);

	boxes.forEach((box) => box.addEventListener('click', boxClickHandler));
	startButton.addEventListener('click', startGame);
	clearButton.addEventListener('click', () => location.reload());
};

main();
