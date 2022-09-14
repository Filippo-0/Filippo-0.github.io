import GUI from './GUI.js';
import SnakeGame from './SnakeGame.js';
import { globals as G } from './globals.js';


/* Create Game Board and Interface and link them together */
const gui = new GUI(G.TOTAL_ROWS, G.TOTAL_COLS);
gui.generateBoard();
const snakeGame = new SnakeGame(gui);
gui.linkGameLogic(snakeGame);

document.querySelector(".game-buttons__start").addEventListener('click', () => {
    snakeGame.reset();
    gui.startGame();
})

/* Mobile Controls */

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* right swipe */
            gui.mobileMove('D');
        } else {
            gui.mobileMove('A');
            /* left swipe */
        }
    } else {
        if (yDiff > 0) {
            /* down swipe */
            gui.mobileMove('S');
        } else {
            gui.mobileMove('W');
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
