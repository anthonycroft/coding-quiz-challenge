var startButton = document.querySelector("#start");
var startMessage = document.querySelector("#start-screen");
var timerElement = document.querySelector("#time");
var choices = document.querySelector("#choices");
var questionTitle = document.querySelector("#question-title");
var feedback = document.querySelector("#feedback");

// var chosenWord = "";
// var numBlanks = 0;
var winCounter = 0;
var questionCount = quiz.length;
var index = 0; // binding for question #.
var timerCount;
var correctReponse = "Correct!";
var incorrectReponse = "Wrong!";
var timeoutId = 0;
// var loseCounter = 0;
// var isWin = false;
// var timer;
// var timerCount;

// The startGame function is called when the start button is clicked
function startGame() {
  
  // set timer seconds
  timerCount = 75;

  // reset the question index
  index = 0;
  choices.innerHTML = "";
  questionTitle.textContent = "";

  startTimer();
  manageQuiz();
  // Prevents start button from being clicked when round is in progress
  // startButton.disabled = true;
  // renderBlanks()
  // startTimer()
}

// function init () {
//   startGame;
// }


// manages th quiz session
function manageQuiz () {
  // calls function to ask question
  console.log("index is: " + index)
  
  if (index < quiz.length) {
    askQuestion(index);
  }
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(() => {
    timerCount--;
    // console.log("Counter is: " + timerCount);
    timerElement.textContent = timerCount;
    if (index == quiz.length || timerCount <= 0) {
      // Tests if win condition is met
      // if (timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        endGame();
      // }
    }
    // Tests if time has run out
    // if (timerCount < 0) {
    //   // Clears interval
    //   clearInterval(timer);
    //   //loseGame();
    // }
  }, 1000);
}

function askQuestion(index) {
  // Clear todoList element and update todoCountSpan
  choices.innerHTML = "";

  var question  = quiz[index].question;
  var answerCount = quiz[index].answers.length;

  // display the question
  questionTitle.textContent = question;

  // Render a new button for each possible answer
  for (var i = 0; i < answerCount; i++) {
  
    var answer = quiz[index].answers[i];
    var button = document.createElement("button");
    
    // add text to the newly created button
    button.textContent = `${i+1}. ${answer}`;

    // set a data value, so we can tell which button is clicked later
    button.setAttribute("data-index", i);

    // append button to choices div
    choices.appendChild(button);
   }
}

function endGame () {
  //clearInterval(timer);
  timerElement.textContent = 0;
  console.log("Timer element just set to 0: "  + timerElement.textcontent)
  //alert("game over");
  clear(timeoutId);

}

// Capture Start button being clicked
startButton.addEventListener("click", function(event) {
 
  // hide the start screen
  startMessage.setAttribute("class", "hide");
  // start a new game
  startGame();

});

// Capture a choices button being clicked
choices.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // get the index of clicked button
    var selectedIndex = element.getAttribute("data-index");
    var correctIndex = quiz[index].correct;

    // check if contestant selected the right answer
    if (selectedIndex == correctIndex) {
      feedback.textContent = correctReponse;
      winCounter++;
    } else {
      // take 10 seconds off for an incorrect answer
      timerCount = timerCount - 10;
      feedback.textContent = incorrectReponse;
    }

    // set a timer for display of response text
    timeoutId = setTimeout(() => {
      feedback.textContent = "";
    }, 1500);

    index++;
    console.log("Index is:" + index)
    // revert to quiz manager
    manageQuiz();
  }
});


