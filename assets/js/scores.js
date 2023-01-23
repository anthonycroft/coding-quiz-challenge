var ol = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
var countToShow = 10;

function init() {

    // retrieve scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));

    ///////////////////////////////////
    // display the top 10 scores
    ///////////////////////////////////

    if (scores == null) {
      console.log("scores are: " + null)
      return;
    }

    // get an array of scores
    var sortedScores = scores.slice();

    // sort the copy array
    sortedScores.sort((a, b) => b.score - a.score);

    var maxScores = Math.min(countToShow, sortedScores.length);

    for (i = 0; i < maxScores; i++) {
      var entry = sortedScores[i].initials + ' - ' + sortedScores[i].score;
      var li = document.createElement("li");
      li.textContent = entry;

      //append to list of high scores
      ol.appendChild(li);
    }
}

// Capture Start button being clicked
clearButton.addEventListener("click", function () {

  // clear local storage
  localStorage.setItem("scores", null);

  // redisplay scores
  ol.innerHTML = "";
});

init();