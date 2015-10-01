//create background and HTML canvas
var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);
var deck = new CardDeck();
var stockPile = [];
var wastePile = [];
var firstRow = [];
var secondRow = [];
var thirdRow = [];
var fourthRow = [];

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
	
	stage.addEventListener("click", function(event) { 
		//get the card that the user clicked 
		var target = event.target;
		//get the value of card on the top of the waste pile
		//to check if the target card can be played
		var waste = wastePile[wastePile.length-1].getValue();
		//get value of clicked card for comparison
		var clicked = target.getValue();
		//if the clicked card is at the top of the stock pile, add to waste pile
		if( target.getNumber() == stockPile[stockPile.length-1].getNumber()) {
			var currentCard = stockPile.pop();
			currentCard.flip();
			addToWastePile(currentCard);
			stage.update();
		}
		//if the clicked card is a card, check to see if it is one value greater than
		//or less than the card on top of waste pile...//ace value == 1 and 2 value == 13 (because of the file arrangement)
		//if clicked value + waste value is 15 (ace and 2), it can be played
		else if( target instanceof Card && clicked == (waste + 1) || clicked == (waste - 1) 
				|| (clicked + waste == 14) ) {
			target.setPlayed();
			addToWastePile(target); 
			checkAdjacent(target);
			stage.update();
		}
	});
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