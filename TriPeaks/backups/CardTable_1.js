/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var CardTable = function(canvas) {
    this.initialize(canvas);
    console.log("-------------------CANVAS CREATED-------------------------");
    this.firstRow = [];
    this.secondRow = [];
    this.thirdRow = [];
    this.fourthRow = [];
    this.stockPile = [];
    this.wastePile = [];
    this.deck = new CardDeck();
    //startX is card width
    this.startX = ( new Card(0) ).width*3;
    //startY is half the card height
    this.startY = ( new Card(0) ).height/2;
};

CardTable.prototype = new createjs.Stage();

CardTable.prototype.createStockPile = function(cards) {
    for(i=0; i<23; i++) {
        cards[i].x = 10;
        cards[i].y = 50;
        this.stockPile[i] = cards[i];
    }
};
CardTable.prototype.addToWastePile = function(card) {
    card.x = startX + card.width;
    card.y = startY;
    this.wastePile.push(card);
    this.addChild(card);
    this.update();
};

CardTable.prototype.createFirstRow = function(card) {
    for(i=0; i<3; i++) {
        card.x = this.startX*(i+1);
        card.y = this.startY;
        this.firstRow[i] = card;
    }
    
}
CardTable.prototype.createSecondRow = function(card) {
    var x = startX - 1.5*card.width;
    for(i=0; i<6; i++) {
        if(i < 3)
            card.x = this.firstRow[i].x - (card.width/2);
        else card.x = this.firstRow[i%3].x + (card.width/2);
        card.y = card.height/2;
        this.secondRow[i] = card;
    }
};
CardTable.prototype.createThirdRow = function(card) {
    for(i=0; i<9; i++) {
        this.thirdRow[i] = card;
        if(i<3)
            card.x = this.secondRow[i].x - (card.width/2);
        else if(i > 2 && i < 6)
            card.x = this.secondRow[i%6].x - (card.width/2); 
        else this.thirdRow[i].x = this.thirdRow[i-3].x + card.width;
        this.thirdRow[i].y = this.thirdRow[i].height;
    }
};
CardTable.prototype.createFourthRow = function(card) {
    
    for(i=0; i<10; i++) {
        this.fourthRow[i].x = this.startX + card.width*i;
        this.fourthRow[i].y = this.thirdRow[0].y + card/2;
        this.fourthRow[i] = card;
        this.fourthRow[i].flip();
    }
};

CardTable.prototype.drawRows = function() {
        for(var i in this.firstRow) this.addChild(this.firstRow[i]);
        this.update();
//        for(var i in this.secondRow) this.addChild(this.secondRow[i]);
//        for(var i in this.secondRow) this.addChild(this.thirdRow[i]);
//        for(var i in this.secondRow) this.addChild(this.fourthRow[i]);
};

CardTable.prototype.drawStockPile = function() {
    for(i=0; i<3; i++) {
        console.log("this.stockPile[i]");
        this.addChild(this.stockPile[i]);
    }
    this.update();
};
