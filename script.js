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
console.log(shuffledColors)
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

let guess1 = null;
let guess2 = null;
let matchCount = 0;
const solvedColors = [];

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const colorGuessed = event.target.classList.value;
  console.log(`The colorGuessed variable is ${colorGuessed}`)

  function cardFlipper() {
    let counter = 0;
    const timer = setInterval(function() {
      event.srcElement.style.backgroundColor = `${colorGuessed}`;
      counter += 1;
      if (counter >= 3) {
        clearInterval(timer);
        event.srcElement.style.backgroundColor = ``;
      }
    }, 200)
  }

  

  if (solvedColors.includes(event.target.classList.value)) {
    console.log(`You have already matched the color ${event.target.classList.value}`)
    guess1 = null;
    guess2 = null;
    return;
  }

  if (guess1 === null && guess2 === null) {
    guess1 = event.target.classList.value;
  } else if (guess1 !== null && guess2 === null) {
    guess2 = event.target.classList.value;
  } else if (guess1 !== null && guess2 !== null) {
    guess1 = event.target.classList.value;
    guess2 = null;
  }

  console.log(`Guess 1: ${guess1} Guess 2: ${guess2}`);
  if (guess1 === guess2) {
    console.log("WOW! AMAZING KEN! You're DOIN GREAT! AMAZING! I BELIEVE IN YOU!")
    matchCount += 1;
    if (matchCount === 5) {
      alert("Game Over! You win! Refresh the page to start over! ")
    }
    solvedColors.push(guess1);
    const targets = document.getElementsByClassName(`${guess2}`);
    for (let target of targets) {
      target.style.backgroundColor = guess2;
    }
    return;
  } else {
    cardFlipper();
  }
  

}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */