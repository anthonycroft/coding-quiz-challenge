var ol = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");
var h1Element = document.querySelector("h1");
var clearButton = document.querySelector("#clear");

var countToShow = 10;

function init() {

    // retrieve scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));

    ///////////////////////////////////////////////////////////////////////
    // display the top 10 scores
    ///////////////////////////////////////////////////////////////////////

    if (scores == null) {
      h1Element.innerHTML = "There are currently no high scores to display! <br> Check back soon."
      h1Element.setAttribute("id", "no-highscores");
      clearButton.setAttribute("class", "hide");
      return;
    }

    // get copy of scores array
    var sortedScores = scores.slice();

    // sort copy array in descending order
    sortedScores.sort((a, b) => b.score - a.score);

    // display top n (= lesser of Top and array length)
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