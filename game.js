/******************Please read the readme file for known issues**********************/
//create background, HTML canvas, and initialize game objects and rows
var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);
var deck = new CardDeck();
deck.shuffle();
var stockPile = [];
var wastePile = [];
var firstRow = [];
var secondRow = [];
var thirdRow = [];
var fourthRow = [];
var score = 0;

//score initialization
var font = "#F5F5F5"
var scoreText = new createjs.Text("Score: " + score, "20px Arial", font);
stage.addChild(scoreText);

//time initialization
var overallSeconds = 150; //2 minutes, 30 seconds
var timer = new createjs.Text("Time: 2:30", "20px Arial", font);
timer.y = 25;
stage.addChild(timer);

//bonus initialization
var bonus = 20000;
var bonusScore = new createjs.Text("Bonus: " + bonus, "20px Arial", font);
bonusScore.y = 50;
stage.addChild(bonusScore);

//set interval for timer to one second
setInterval(timerDisplay, 1000);


window.onload = function init() {
	//get first card from deck and put on waste pile
	var firstCard = deck.getCard();
	firstCard.flip();
	addToWastePile(firstCard);
	createStockPile();
	createFirstRow();
	createSecondRow();
	createThirdRow();
	createFourthRow();
	var replay = document.getElementById("ReplayButton");
	var newGame = document.getElementById("NewGame");
	//newGame.addEventListener("click", window.location.reload(true));
	replay.addEventListener("click", rebuildCanvas );
	stage.addEventListener("click", function(event) { 
		//get the card that the user clicked 
		var target = event.target;
		//get the value of card on the top of the waste pile
		//to check if the target card can be played
		var waste = wastePile[wastePile.length-1].getValue();
		//get value of clicked card for comparison
		var clicked = target.getValue();
		//if the clicked card is at the top of the stock pile, add to waste pile
		if( stockPile.length > 0 && target.getNumber() == stockPile[stockPile.length-1].getNumber()) {
			var currentCard = stockPile.pop();
			currentCard.flip();
			addToWastePile(currentCard);
			stage.update();
		}
		//if the clicked card is a card, check to see if it is one value greater than
		//or less than the card on top of waste pile...
		//ace value == 1 and 2 value == 13 (because of the file arrangement in /images)
		//if clicked value + waste value is 14 (ace and 2), it can be played
		else if( target instanceof Card && clicked == (waste + 1) || clicked == (waste - 1) 
				|| (clicked + waste == 14) ) {
			//check for win or lose, display stats
			if( playerHasWon() || playerHasLost() ) displayStats();
			//if top of the waste pile is a card played from one of the peaks
			//the clicked card is a consecutive match, add 200 points to score
			if( wastePile[wastePile.length-1].hasBeenPlayed() )
				score += 200;
			//if it's not a consecutive match, add 100 points to score
			else score += 100;
			scoreText.text = "Score: " + score;
			target.setPlayed(true);
			addToWastePile(target); 
			checkAdjacent(target);
			stage.update();
		}
	});
	stage.update();
}

function timerDisplay() {
	if (bonus > 0) bonus -= 200;
	bonusScore.text = "Bonus: " + bonus;
	
	overallSeconds--;
	var minutes = Math.floor(overallSeconds/60);
	var seconds = overallSeconds - minutes*60;
	
	//if seconds is one digit, add a 0 to keep time format
	if (seconds < 10) seconds = "0" + seconds;
	timer.text = ("Time: " + minutes + ":" + seconds);
	
	if (overallSeconds <= 0) displayStats();
	stage.update();
}

function createWastePile() {
	//put one card on waste pile
	wastePile.push( deck.getCard() );
	wastePile[0].x = 200;
	wastePile[0].y = 350;
	wastePile[0].flip();
	//add waste pile card to canvas
	stage.addChild(wastePile[0]);
}

function addToWastePile(card) {
	card.x = 200;
	card.y = 350;
	wastePile.push(card);
	stage.addChild(card);
}

function createStockPile() {
	//create stock pile and add to canvas
	for(i=0; i<23; i++) {
		var currentCard = deck.getCard();
		currentCard.x = 100;
		currentCard.y = 350;
		currentCard.setRow(5);
		stockPile.push(currentCard);
		stage.addChild(stockPile[i]);
	}
}

function createFirstRow() {
	//create first row of cards and position on canvas
	for(i=0; i<3; i++) {
		var currentCard = deck.getCard();
		currentCard.x = currentCard.width*(i*3) + 180;
		currentCard.y = currentCard.height/2;
		currentCard.setRow(1); 
		firstRow[i] = currentCard;
		stage.addChild(firstRow[i]);
	}
}

function createSecondRow() {
	//create second row of cards and position on canvas
	for(i=0; i<6; i++) {
		currentCard = deck.getCard();
		if(i < 2)
			currentCard.x = currentCard.width*i + 	currentCard.width*2;
		else if(i < 4)
			currentCard.x = currentCard.width*i + currentCard.width*3;
		else currentCard.x = currentCard.width*i + currentCard.width*4;
		currentCard.y = currentCard.height;
		currentCard.setRow(2);
		secondRow[i] = currentCard;
		stage.addChild(secondRow[i]);
	}
}

function createThirdRow() {
	//create third row of cards and position on canvas
	for(i=0; i<9; i++) {
		var currentCard = deck.getCard();
		currentCard.x = currentCard.width*i + currentCard.width*1.5;
		currentCard.y = currentCard.height*3/2;
		currentCard.setRow(3);
		thirdRow[i] = currentCard;
		stage.addChild(thirdRow[i]);
	}
}
//this function depends on the creation of the third row
function createFourthRow() {
	//create fourth row of cards and position on canvas
	var offSet = thirdRow[0].x - thirdRow[0].width/2;
	for(i=0; i<10; i++) {
		var currentCard = deck.getCard();
		currentCard.x = offSet + currentCard.width*i;
		currentCard.y = thirdRow[0].y + currentCard.height/2;
		currentCard.setRow(4);
		currentCard.flip();
		fourthRow[i] = currentCard;
		stage.addChild(fourthRow[i]);
	}
}
//puts all the cards back into their original spots
/***************code duplication, needs refactorization***************/
function rebuildCanvas() {
	stage.removeAllChildren();
	for(i=0; i<firstRow.length; i++) {
		if(firstRow[i].isFaceUp()) {
			firstRow[i].flip();
			firstRow[i].setPlayed(false);
		}
		firstRow[i].x = firstRow[i].width*(i*3) + 180;
		firstRow[i].y = firstRow[i].height/2;
		stage.addChild(firstRow[i]);
	}
	for(i=0; i<secondRow.length; i++) {
		if(secondRow[i].isFaceUp()) {
			secondRow[i].flip();
			secondRow[i].setPlayed(false);
		}
		if(i < 2)
			secondRow[i].x = secondRow[i].width*i + secondRow[i].width*2;
		else if(i < 4)
			secondRow[i].x = secondRow[i].width*i + secondRow[i].width*3;
		else secondRow[i].x = secondRow[i].width*i + secondRow[i].width*4;
		secondRow[i].y = secondRow[i].height;
		stage.addChild(secondRow[i]);
	}
	for(i=0; i<thirdRow.length; i++) {
		if(thirdRow[i].isFaceUp()) {
			thirdRow[i].flip();
			thirdRow[i].setPlayed(false);
		}
		thirdRow[i].x = thirdRow[i].width*i + thirdRow[i].width*1.5;
		thirdRow[i].y = thirdRow[i].height*1.5;
		stage.addChild(thirdRow[i]);
	}
	for(i=0; i<fourthRow.length; i++) {
		fourthRow[i].setPlayed(false);
		console.log(fourthRow[i].hasBeenPlayed());
		fourthRow[i].x = fourthRow[i].width + fourthRow[i].width*i;
		fourthRow[i].y = 1.5*fourthRow[i].height + fourthRow[i].height/2;
		stage.addChild(fourthRow[i]);
	}
	//pop from waste until one card left
	//if waste card was in stockpile, put it back in stockpile
	for(i=0; i<wastePile.length-1; i++) {
		var wasteCard = wastePile.pop();
		if(wasteCard.getRow() == 5) {
			wasteCard.x = 100;
			wasteCard.y = 350;
			wasteCard.flip();
			stockPile.push(wasteCard);
		}
	}
	firstCard = stockPile.pop();
	firstCard.flip()
	addToWastePile(firstCard);
	//redraw the stockpile
	 for(i=0; i<stockPile.length; i++) {
		stage.addChild(stockPile[i]);
	} 	
	resetStats();
	stage.update();
}
//checks played card to see if adjacent card has also been played
//if it has, this function should flip the corresponding card
//on the row above the two adjacent cards
function checkAdjacent(card) {
	//get row of card being checked
	var cardRow = card.getRow();
	//if clicked card is in row 4, determine if appropriate
	//third row card should be flipped over
	if(cardRow == 4) {
		for(i=0; i<fourthRow.length-1; i++) {
			if( fourthRow[i].hasBeenPlayed() && fourthRow[i+1].hasBeenPlayed() && !(thirdRow[i].isFaceUp()) ) {
				thirdRow[i].flip();
			}
		}
	}
	/*there has to be a better way to do this but I'm running short on time*/
	//if clicked card is in row 4, determine if appropriate card in
	//row 2 should be flipped over
	else if(cardRow == 3) {
		if( thirdRow[0].hasBeenPlayed() && thirdRow[1].hasBeenPlayed() 
				&& !(secondRow[0].isFaceUp()) )
			secondRow[0].flip();
		
		if( thirdRow[1].hasBeenPlayed() && thirdRow[2].hasBeenPlayed() 
				&& !(secondRow[1].isFaceUp()) )
			secondRow[1].flip();
		
		if( thirdRow[3].hasBeenPlayed() && thirdRow[4].hasBeenPlayed() 
				&& !(secondRow[2].isFaceUp()) )
			secondRow[2].flip();
		
		if( thirdRow[4].hasBeenPlayed() && thirdRow[5].hasBeenPlayed() 
				&& !(secondRow[3].isFaceUp()) )
			secondRow[3].flip();
		
		if( thirdRow[6].hasBeenPlayed() && thirdRow[7].hasBeenPlayed()
				&& !(secondRow[4].isFaceUp()) )
			secondRow[4].flip();
		
		if( thirdRow[7].hasBeenPlayed() && thirdRow[8].hasBeenPlayed()
				&& !(secondRow[5].isFaceUp()) )
			secondRow[5].flip();
	}
	/*there's also probably a way better way to do this*/
	else if(cardRow == 2) {
		if( secondRow[0].hasBeenPlayed() && secondRow[1].hasBeenPlayed() 
				&& !(firstRow[0].isFaceUp()) )
			firstRow[0].flip();
		
		if( secondRow[2].hasBeenPlayed() && secondRow[3].hasBeenPlayed() 
				&& !(firstRow[1].isFaceUp()) )
			firstRow[1].flip();
		
		if( secondRow[4].hasBeenPlayed() && secondRow[5].hasBeenPlayed() 
				&& !(firstRow[2].isFaceUp()) )
			firstRow[2].flip(); 
	}
}

function displayStats() {
	stage.removeAllChildren();
	var endScore = score + bonus;
	if( playerHasWon() )
		var stats = new createjs.Text("Congratulations, You Won!\nScore: " + endScore, "30px Arial", font);
	else 
		var stats = new createjs.Text("You Lost. Try not to do that.\nScore: " + endScore, "30px Arial", font);
	stats.x = 225;
	stats.y = 175;
	stage.addChild(stats);
	stage.update();
}

function playerHasWon() {
	var peaks = 0;
	for(i=0; i<firstRow.length; i++) {
		if(firstRow[i].hasBeenPlayed())
			peaks++;
	}
	if (peaks == 3) return true;
	return false;
}

function playerHasLost() {
	//if player hasn't won and is out of time, player loses
	if(overallSeconds == 0 && !playerHasWon())
		return true;	
	return false;
	//need to implement a check for case where no more cards can be played
}

/*********code duplication, needs to be fixed************/
function resetStats() {
	score = 0;

	//score initialization
	font = "#F5F5F5"
	scoreText = new createjs.Text("Score: " + score, "20px Arial", font);
	stage.addChild(scoreText);

	//time initialization
	overallSeconds = 150; //2 minutes, 30 seconds
	timer = new createjs.Text("Time: 2:30", "20px Arial", font);
	timer.y = 25;
	stage.addChild(timer);

	//bonus initialization
	bonus = 20000;
	bonusScore = new createjs.Text("Bonus: " + bonus, "20px Arial", font);
	bonusScore.y = 50;
	stage.addChild(bonusScore);

	//set interval for timer to one second
	//setInterval(timerDisplay, 1000);
}