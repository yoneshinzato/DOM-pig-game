/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

*/

//initial values
var scores, roundScore, activePlayer, dice, gamePlaying;
init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. update the round score IF the rolled number was not a 1
    if (dice === 6 && lastDice === 6) {
      //player loses score
      scores[activePlayer] = 0;
      //update DOM
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }

    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    //undefined, 0, null or "" are coerced to false
    //anthing is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.displa = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector(".player-0-panel").classList.remove("active");

  //document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0; //we have 1 roundScore at a time (for each player)
  activePlayer = 0; //the player that is currently playing
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
