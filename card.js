/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Card = function(number) {
	this.initialize("images/" + 0 + ".png");
	console.log( this.getImagePath() );
	this.back = this.image;
	this.back.src = this.image.src;
    this.faceUp = false;
    this.number = number;
    this.rowNumber;
    this.isPlayed = false;
    this.value = Math.ceil( (this.number)/4 );
    //by default, card is face down,
    //so the back image will be the 
    //default image
    this.height = 96;
    this.width = 72;
    //preload the card's front image
    this.frontImage = new Image();
    this.frontImage.src = ( this.getImagePath() );
};

Card.prototype = new createjs.Bitmap();

Card.prototype.flip = function() {
	if( this.faceUp ) {
		this.image = this.back;
		this.faceUp = false;
	}
	else {
		this.image = this.frontImage;
		this.faceUp = true;
	}
};

Card.prototype.getImagePath = function() {
        return "images/" + this.number + ".png";
};

Card.prototype.getValue = function () {
    return this.value;
};

Card.prototype.getNumber = function() {
    return this.number;
};

Card.prototype.isFaceUp = function() {
    if( this.faceUp ) 
        return true;
    else return false;
};
Card.prototype.getWidth = function() {
    return this.width;
};

Card.prototype.getHeight = function() {
    return this.height;
};

Card.prototype.setRow = function(rowNumber) {
    this.rowNumber = rowNumber;
};
Card.prototype.getRow = function() {
    return this.rowNumber;
};

Card.prototype.setPlayed = function(trueOrFalse) {
    this.isPlayed = trueOrFalse;
};

Card.prototype.hasBeenPlayed = function() {
    return this.isPlayed;
};
