/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Card = function(number) {
    this.isFaceUp = false;
    this.number = number;
    this.value = Math.ceil( (this.number)/4 );
    //by default, card is face down,
    //so the back image will be the 
    //default image
    this.initialize("images/" + 0 + ".png");
    console.log("card created")
    this.height = this.getBounds().height;
    this.width = this.getBounds().width;
    //preload the card's front image
    this.frontImage = new Image();
    this.frontImage.src = ( this.getImagePath() );
};

Card.prototype = new createjs.Bitmap("images/" + this.number + ".png");

Card.prototype.getImagePath = function() {
        return "images/" + this.number + ".png";
};

Card.prototype.getValue = function () {
    return this.value;
}
Card.prototype.flip = function() {
//    this.image = new Image();
//    this.image.src = ( this.getImagePath() );
    this.image = this.frontImage;
    this.isFaceUp = true;
};

Card.prototype.getHeight = function() {
    return this.height;
};

Card.prototype.getWidth = function() {
    return this.width;
};