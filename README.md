# coding-quiz-challenge
Presents a JavaScript quiz to test player's knowledge of the JavaScript language and techniques.

## Description

This app loops through a set of pre-defined JavaScript questions presenting the player with a group of multiple choice answers from which they can select. Only one answer can be selected.

At the end of the quiz the player is presented with their score and the opportunity to save this score to the list of high scores (which are saved to local storage) against their initials. An exception to this is where the user scores zero, which is considered a no-score.

A player is prevented from saving their score if they do not enter their initials - in which case an appropriate warning is issued.

A particular score will only be saved once per set of initials.

After submitting a score the player is presented with the current list of high scores. This list displays the current *Top 10* in descending order OR all saved scores (if less than 10 currently stored).

If there are no saved high scores, an appropriate message is displayed to the player in place of the current high scores list.

## Dependencies

The app uses the Sweetalert2 library which is documented here:

[Sweetalert2](https://sweetalert2.github.io/)

## Limitations

The app does not have an ability to create logins; which means that players with the same initials will not be uniquely identified by the system. This will be considered for a future upgrade.

## Deployed Link:

[Password Generator](https://anthonycroft.github.io/coding-quiz-challenge/)

## Repo Link:

[Repository](https://github.com/anthonycroft/coding-quiz-challenge)

## Screenshots:

![Coding Quiz Challenge Home Page](https://github.com/anthonycroft/coding-quiz-challenge/blob/main/assets/images/coding-quiz-start-page.png)

![Coding Quiz Challenge Question Page](https://github.com/anthonycroft/coding-quiz-challenge/blob/main/assets/images/coding-quiz-highscores-page.png)

![Coding Quiz Challenge High Scores Page](https://github.com/anthonycroft/coding-quiz-challenge/blob/main/assets/images/coding-quiz-question-page.png)


## Installation

NA

## License

MIT Licence
