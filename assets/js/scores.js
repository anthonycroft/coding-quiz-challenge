var ol = document.querySelector("#highscores");

function init() {
    // retrieve scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores"));

    ///////////////////////////////////
    // display the top 10 scores
    ///////////////////////////////////

    if (scores == null) {
      return;
    }

    // get an array of scores
    var sortedScores = scores.slice();

    // sort the copy array
    sortedScores.sort((a, b) => b.score - a.score);

    for (i = 0; i < sortedScores.length; i++) {
      var entry = sortedScores[i].initials + ' - ' + sortedScores[i].score;
      var li = document.createElement("li");
      li.textContent = entry;
      //li.setAttribute("data-index", i);
  
      //append to list of high scores
      ol.appendChild(li);
    }

}

init();