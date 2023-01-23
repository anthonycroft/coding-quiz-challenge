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
var scoreDetails = document.querySelector("#score-details");
var quizResult = document.querySelector("#quiz-result");

var winCounter = 0;
var questionCount = quiz.length;
var index = 0; // binding for question #.
var timerCount;
var correctReponse = "Correct!";
var incorrectReponse = "Wrong!";
var timeoutId = 0;

// The startGame function is called when the start button is clicked
function startGame() {
  
  // set timer seconds
  timerCount = 75;

  // set the question index and question / answers to defaults
  index = 0;
  choices.innerHTML = "";
  questionTitle.textContent = "";

  // unhide the questions section
  questions.setAttribute("class", "");

  // start Quiz timer 
  startTimer();
  // start Quiz
  manageQuiz();
}

// manages the quiz session by asking questions in order
function manageQuiz () {

  if (index < quiz.length) {
    askQuestion(index);
  } else {
    // if we have reached the end of the quiz end the game
    endGame();
  } 
}

// The setTimer function starts and stops the timer and triggers endGame() when end 
// of quiz or time limit expires
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
  // Clear answers from any previous question
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

  if (winCounter === 0) {
    scoreDetails.innerHTML = '<a href="index.html"><button>Go Back</button></a>' + '<a href="highscores.html"><button>View Highscores</button></a>';
    quizResult.textContent = "Uh-Oh! You scored zero, time to brush up on your JavaScript!"
  }
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

// save the user's initials and score (where score != 0 and this is not a duplicate score for user)
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
      // we simply return as this is not a unque score for this user
      return;
    }
  } else {
    // create scores object (array of user score)
    var scores = [];
  }

  // add this score to the scores object
  scores.push(entry);
  // add new scores object (array) to local storage
  localStorage.setItem("scores", JSON.stringify(scores));
}

// checks whether this is a unique score for this player
function checkScoreUnique(entry, scores) {
  var unique = true; // assume score will be unique

  for (let i = 0; i < scores.length; i++) {
    if (JSON.stringify(entry) === JSON.stringify(scores[i])) {
      unique = false; // score is not unique
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

  return result.isConfirmed; // true if user wants to record score

}

// Capture a choices button being clicked
choices.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // get the index of clicked button (== answer index)
    var selectedIndex = element.getAttribute("data-index");
    var correctIndex = quiz[index].correct;

    // check if player selected the right answer
    if (selectedIndex == correctIndex) {
      feedback.textContent = correctReponse;
      playSound(true);
      winCounter++;
    } else {
      // take 10 seconds off for an incorrect answer
      timerCount = timerCount - 10;
      feedback.textContent = incorrectReponse;
      playSound(false);
    }

    // unhide the feedback section
    feedback.setAttribute("class", "feedback");

    // set a timer for display of feedback text
    timeoutId = setTimeout(() => {
      // clear the feedback section
      feedback.textContent = "";
      feedback.setAttribute("class", "feedback hide");
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





