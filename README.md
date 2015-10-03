# TriPeaks
A TriPeaks Solitaire game implemented in Javascript
Tested in newest versions (as of 10/2/2015) of IE, Firefox, Chrome, Edge, and Safari

Due to time constraints, the game logic is somewhat messy and the code could use some refactoring.

Most notable problems:

Some code is very similar in the functions used to create the rows and the functions
used to rebuild the canvas when the user chooses to replay.  This could likely be slimmed up quite
a bit and put into a separate function to be used in new game situations along with replay situations.

There are a lot of global variables being used in game.js for implementation of the game's logic.
Localizing these variables and appropriately parameterizing functions accordingly would be preferable.

I tried to implement a class called CardTable for the canvas itself, with the responsibility of displaying
and managing the rows, stock pile, and waste pile.  It failed, and due to time constraints I reverted back 
to having game.js take care of it.  Game.js is currently managing more than it probably should, and I'd like 
to make another attempt at implementing a class for the display.

A better algorithm for checking if cards in the next row can be flipped over would be nice. As you can see, 
right now a massive nested if statement is being used.

The card class could use some adjustments in dealing with images.

Any comments or suggestions would be appreciated.
