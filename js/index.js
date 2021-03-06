'use strict';

function printOutput(selector_id, text) {
	document.getElementById(selector_id).innerHTML = text;
}

var newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', function () { newGame() })

var playerChoose = document.querySelectorAll('.player-move');

for (var i = 0; i < playerChoose.length; i++) {
	playerChoose[i].addEventListener('click', function () {
		playerMoveAction(this.getAttribute('data-move'));
	});
}

var pickAllBtn = document.getElementById('pickElem');
var newGameElem = document.getElementById('newGameElement');
var resultsElem = document.getElementById('resultsTableElement');

var params = {
	playerScore: 0,
	computerScore: 0,
	roundNumber: 0,
	endGame: true,
	progress: []
}

var showModal = function (selector) {
	document.querySelector('#' + selector).classList.add('show');
	buildTable(selector);
};

var hideModal = function (selector) {
	document.querySelector(selector).classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal');

for (var i = 0; i < closeButtons.length; i++) {
	closeButtons[i].addEventListener('click', function (event) {
		hideModal('#' + event.currentTarget.className.split(' ')[1]);
	});
}

var gameState = 'notStarted'
params.playerScore = 0,
	params.computerScore = 0,
	params.roundNumber = 0;

var endGame = function () {
	params.playerScore = 0;
	params.computerScore = 0;
	params.roundNumber = 0;

	params.progress = [];
	output2.innerHTML = '';
	output3.innerHTML = '';
	result.innerHTML = '';
	result1.innerHTML = '';
	playerScore.innerHTML = '';
	computerScore.innerHTML = '';
}
endGame();

function setGameElements() {
	switch (gameState) {
		case 'started':
			newGameElem.style.display = 'block';
			pickAllBtn.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'params.ended':
			newGameButton.innerText = 'Play Again';
			pickAllBtn.style.display = 'none';
			resultsElem.style.display = 'block';
			endGame();
			break;
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickAllBtn.style.display = 'none';
			resultsElem.style.display = 'block';
	}
}
setGameElements();

function newGame() {

	endGame();
	params.roundNumber = prompt('How many rounds will end the game?');
	if (params.roundNumber == '' || isNaN(params.roundNumber) || params.roundNumber <= 0) {
		alert('Wrong Number');
	} else {
		if (params.roundNumber < 99) {
			gameState = 'started';
		}
		if ((params.roundNumber === '') || (params.roundNumber === null)) {
			gamestate = 'default'
		}
	

	printOutput('numRoundToWin', params.roundNumber);
	setGameElements();
	}
	printOutput('result', '');
	printOutput('result1', '');

};

function playerMoveAction(playerMove) {

	var gameOptions = new Array('Paper', 'Rock', 'Scissors');
	var computerMove = gameOptions[Math.floor(Math.random() * 3)];
	printOutput('output2', playerMove);
	printOutput('output3', computerMove);

	switch (isPlayerWin(playerMove, computerMove, )) {
		case 1:
			params.playerScore += 1
			printOutput('result', 'Player Win');
			if (params.playerScore == params.roundNumber) {
				gameState = 'ended';
				showModal('win');
			};
			break;
		case 0:
			printOutput('result', 'Nobody Win');
			break;
		case -1:
			params.computerScore += 1
			printOutput('result', 'Computer Win');
			if (params.computerScore == params.roundNumber) {
				gameState = 'ended';
				showModal('lost');
			};
			break;
	};
	setGameElements();
	printOutput('playerScore', params.playerScore);
	printOutput('computerScore', params.computerScore);
	params.progress.push({
		PlayerMove: playerMove,
		ComputerMove: computerMove,
		finalResult: params.playerScore + ' - ' + params.computerScore
	});
};

function isPlayerWin(playerMove, computerMove) {
	if (playerMove == computerMove) {
		return 0;
	}
	if ((playerMove == 'Paper' && computerMove == 'Rock') || (playerMove == 'Rock' && computerMove == 'Scissors') || (playerMove == 'Scissors' && computerMove == 'Paper')) {
		return 1;
	}
	return -1;
};

var buildTable = function (selector) {
	var tbody = document.querySelector('#tbody-' + selector);
	tbody.innerHTML = '';
	params.progress.forEach(function (progressresult, index) {
		var row = document.createElement('tr');
		tbody.appendChild(row);
		buildTableTd(index+1, row);
		for (var key in progressresult) {
			buildTableTd(progressresult[key], row);
		}
	})
};

var buildTableTd = function (value, row) {
	var td = document.createElement('td');
	td.innerHTML = value;
	row.appendChild(td);
};