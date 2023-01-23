var startButton = document.querySelector("#start");
var startMessage = document.querySelector("#start-screen");
var timerElement = document.querySelector("#time");
var choices = document.querySelector("#choices");
var questionTitle = document.querySelector("#question-title");
var feedback = document.querySelector("#feedback");
var questions = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");
var score = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");
var inputInitials = document.querySelector("#initials");

var winCounter = 0;
var questionCount = quiz.length;
var index = 0; // binding for question #.
var timerCount;
var correctReponse = "Correct!";
var incorrectReponse = "Wrong!";
var timeoutId = 0;

// var timer;
// var timerCount;

function resetScreen() {
  // unhide the questions section
  questions.setAttribute("class", "hide");

  // unhide the feedback section
  feedback.setAttribute("class", "feedback hide");

  //reset the start screen
  startMessage.setAttribute("class", "start")
}

// The startGame function is called when the start button is clicked
function startGame() {
  
  // set timer seconds
  timerCount = 75;

  // reset the question index
  index = 0;
  choices.innerHTML = "";
  questionTitle.textContent = "";

  // unhide the questions section
  questions.setAttribute("class", "");

  // unhide the feedback section
  feedback.setAttribute("class", "feedback");

  // start Quiz timer 
  startTimer();
  // start Quiz
  manageQuiz();
}

// manages the quiz session
function manageQuiz () {

  if (index < quiz.length) {
    askQuestion(index);
  } else {
    // if we have reached the end of the questions end the game
    endGame();
  } 
}


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(() => {
    timerCount--;

    timerElement.textContent = timerCount;
    if (index == quiz.length || timerCount <= 0) {

        clearInterval(timer);
        endGame();
    }
  }, 1000);
}

function askQuestion(index) {
  // Clear answers from any previously displayed question
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
  // clear time display
  timerElement.textContent = 0;
 
  // clear timeout on feedback text
  clearInterval(timeoutId);

  // unhide the questions section
  questions.setAttribute("class", "hide");

  // unhide the feedback section
  feedback.setAttribute("class", "feedback hide");

  // add final score to end-screen
  score.textContent = winCounter;

  // display the end-screen
  endScreen.setAttribute("class", "");

}

function playSound (won) {

  // create a new Audio object
  if (won) {
    var sound = new Audio("./assets/sfx/correct.wav");
  } else {
    var sound = new Audio("./assets/sfx/incorrect.wav");
  }

  // play the sound effect
  sound.play();
}

function resetScreen() {

  // unhide the questions section
  questions.setAttribute("class", "hide");

  console.log("ResetScreen fired");

  // unhide the feedback section
  feedback.setAttribute("class", "feedback hide");

  //reset the start screen
  startMessage.setAttribute("class", "start")

  // hide the end-screen
  endScreen.setAttribute("class", "hide");

}

// save the user's initials and score
function recordScore (initials) {

  // get the high scores from local storage
  var scores = JSON.parse(localStorage.getItem("scores"));

  var entry = {
    initials: initials.trim(),
    score: winCounter
  }

  if (scores != null) {
    // check to see if this score already exists for this player
    const unique = checkScoreUnique(entry, scores);

    if (!unique) {
      console.log("score " + entry.score + " is not unique.")
      return;
    }
  } else {
    // create user object for submission
    var scores = [];
  }

  // if this is the first score recorded, set up a new scores array
  if (scores == null) {

  }

  // add this score object to the array of score objects
  scores.push(entry);
  // add scores to local storage
  localStorage.setItem("scores", JSON.stringify(scores));
}

// checks whether this is a unique score for this player
function checkScoreUnique(entry, scores) {
  var unique = true; // assume score will be uniquer

  for (let i = 0; i < scores.length; i++) {
    if (JSON.stringify(entry) === JSON.stringify(scores[i])) {
      unique = false;
      break;
    }
  }

  return unique;

}

// Capture Start button being clicked
startButton.addEventListener("click", function () {
  // hide the start screen
  startMessage.setAttribute("class", "hide");
  // start the game
  startGame();
});

const askToSave = async () => {

  // use the Swal object to get a response from user
  const result = await Swal.fire({
    title: 'Save Score',
    text: 'You must enter your initials to record a score! Do you want to record this score?',
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,  
    customClass: {
      actions: 'my-actions',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    },
  })

  console.log("result.isconfirmed: " + result.isConfirmed )
  return result.isConfirmed;

}

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
      //playSound(true);
      winCounter++;
    } else {
      // take 10 seconds off for an incorrect answer
      timerCount = timerCount - 10;
      feedback.textContent = incorrectReponse;
      //playSound(false);
    }

    // set a timer for display of response text
    timeoutId = setTimeout(() => {
      feedback.textContent = "";
    }, 1500);

    // increment the question index
    index++;

    // revert to quiz manager
    manageQuiz();
  }
});

// Capture Start button being clicked
submitButton.addEventListener("click", async function () {

  var initials = inputInitials.value;

  console.log (inputInitials.value);

  if (initials.length == 0) {
    const response = await askToSave();
    if (response) {
      return;
    }
  } else {
    recordScore(initials);
  }  

  // display highscores page
  location.replace('./highscores.html')
  
});





