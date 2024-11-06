
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/**
 * Starts the game when a key is pressed, if the game hasn't started yet.
 * This function is triggered on any keypress event on the document.
 * It updates the level title, initiates the next sequence, and sets the game as started.
 * @param {Event} event - The keypress event object (implicitly passed by jQuery)
 * @returns {void} This function does not return a value
 */
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/**
 * Handles the click event on buttons with the "btn" class.
 * This method is responsible for:
 * 1. Capturing the user's chosen color
 * 2. Adding the chosen color to the user's click pattern
 * 3. Playing a sound corresponding to the chosen color
 * 4. Animating the button press
 * 5. Checking the user's answer
 *
 * @param {Event} event - The click event object (implicitly passed by jQuery)
 * @returns {void} This method does not return a value
 *
 * @example
 * // This method is typically attached to buttons like this:
 * $(".btn").click(function() {
 *   // Method body
 * });
 */
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

/**
 * Checks the user's answer against the game pattern for the current level.
 * If correct, advances to the next sequence or continues the game.
 * If incorrect, ends the game and prompts for a restart.
 * @param {number} currentLevel - The current level of the game being checked
 * @returns {void} This function doesn't return a value
 */
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


/**
 * Initiates the next sequence in the game.
 * This function performs the following actions:
 * 1. Resets the user's clicked pattern
 * 2. Increments the game level
 * 3. Updates the level display
 * 4. Generates a new random color
 * 5. Adds the new color to the game pattern
 * 6. Animates the button for the chosen color
 * 7. Plays the sound for the chosen color
 * @returns {void} This function does not return a value
 */
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

/**
 * Animates a button press effect for a given color
 * @param {string} currentColor - The color identifier of the button to animate
 * @returns {void} This function does not return a value
 */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/**
 * Plays an audio file with the specified name.
 * @param {string} name - The name of the audio file to play (without the file extension).
 * @returns {void} This function does not return a value.
 */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * Resets the game state to its initial condition.
 * This function resets the level to 0, clears the game pattern array,
 * and sets the 'started' flag to false, effectively preparing the game
 * for a new round or restart.
 *
 * @returns {void} This function does not return a value.
 */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
