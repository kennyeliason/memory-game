const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


const squares = gameContainer.getElementsByTagName('div');

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function resetBoard() {
  count = 0;
  for( let square of squares) {
    if(square.classList.contains('match')) {
    } else {
    square.style = '';
    square.classList.remove('flipped');
    }
  }
}

function matchCards(cards) {
  if( cards[0].className == cards[1].className ) {
    return 'match';
  }
}

function youWin() {
  const matchSquares = document.querySelectorAll('.match');
  if (squares.length == matchSquares.length) {
    for(let match of matchSquares) {
      match.classList.add('flash');
    }
  }
}

let count = 0;
let cards = [];

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  count++;
  if(count<3) {
      cards.push(event.target);
      event.target.style.backgroundColor = event.target.classList;
      event.target.classList.toggle('flipped');
      event.target.style.pointerEvents = 'none';
      if(count == 2) {
        const match = matchCards(cards);
        if(match == 'match') {
          for( let card of cards ) {
            card.classList.add('match');
          }
          cards = [];
        } else {
          cards = [];
        }
        setTimeout(resetBoard, 1000);
        youWin();
      }
  }
}

const startButton = document.querySelector('button');
startButton.addEventListener('click', function() {
  gameContainer.style = '';
  startButton.style.display = 'none';
});

// when the DOM loads
createDivsForColors(shuffledColors);
