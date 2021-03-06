/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CardDeck() {
    //create empty array
    this.deck = [];
    //fill empty array
    for(i=1; i<=52; i++) {
        //fill deck with cards, with i being the number of the card
		var newCard = new Card(i);
        this.deck.push(newCard);
    }
}

CardDeck.prototype.getCard = function() {
    if(this.deck.length < 1) alert("No cards in the deck");
	return this.deck.pop();
};

CardDeck.prototype.getSize = function () {
    return this.deck.length;
};

CardDeck.prototype.shuffle = function() {
    for (i=0; i<this.deck.length; i++) {
      var randomIndex = Math.floor( Math.random()*this.deck.length );
      var temp = this.deck[i];
      this.deck[i] = this.deck[randomIndex];
      this.deck[randomIndex] = temp;
    }
};

CardDeck.prototype.resetDeck = function() {
	for(i=0; i<this.deck.length; i++) {
		if(this.deck[i].hasBeenPlayed())
			this.deck[i].setPlayed(false);
	}
}