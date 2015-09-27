/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CardTable = function(canvas) {
    this.initialize(canvas);
    this.xOffset = 200;
    this.yOffset = 0;
    this.firstRow = [];
    this.secondRow = [];
    this.thirdRow = [];
    this.fourthRow = [];
    this.wastePile = [];
    this.deckPile = [];
};

Table.prototype = new createjs.Stage();

Table.prototype.createFirstRow = function() {
    for(i=0; i<3; i++) {
        
    }
}
