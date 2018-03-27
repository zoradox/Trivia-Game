(function (window) {
  'use strict';
var time, counter, currentTime;


var tallyCount = [rightAnswers, wrongAnswers, unanswered];
var rightAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

 
  var questionBank = [
    { QobjectIndexer: 0, question: "Which of these champions is classed as a mage champion", answer: "Annie" },
    { QobjectIndexer: 1, question: "Which of these champions has an ability to make them unkillable for 4 seconds?", answer: "Tryndamere" },
    { QobjectIndexer: 2, question: "Which of these dragons gives out of combat health regeneration to the team that has killed it?", answer: "Ocean Dragon" },
    { QobjectIndexer: 3, question: "Which of these professional league of legends teams won the Season 3, 5, and 6 world championship tournaments?", answer: "SKT-1" }
  ]

 
  var wrongChoices = [
    ["Rengar", "Zed", "Leona"],
    ["Sivir", "Master Yi", "Darius"],
    ["Infernal Dragon", "Mountain Dragon", "Air Dragon"],
    ["Team Solo Mid", "Team Liquid", "Samsung Galaxy"]
  ]

 
  function randomizeChoices(array) {
    for (var r = array.length - 1; r >= 0; r--) {
      var randomIndex = Math.floor(Math.random() * r + 1);
      var itemAtIndex = array[randomIndex];
      array[randomIndex] = array[r];
      array[r] = itemAtIndex;
    }
    return array;
  }


function questionnaire(questionAnswerArray, choicesArray) {
  for (var i = 0; i < 4; i++) {
    choicesArray[i].push(questionAnswerArray[i].answer);
    $('#questionBox').append("<br><p id=" + "question" + i + ">" + questionAnswerArray[i].question + "</p>");
    choicesArray[i] = randomizeChoices(choicesArray[i]);
    console.log(choicesArray[i]);
    for (var c = 0; c < choicesArray[i].length; c++) {
      console.log(choicesArray[i][c]);
      $('#questionBox').append("<input type=" + "radio" + " name=" + "question" + i + " value=" + "\"" + choicesArray[i][c] + "\"" + " id=" + "question" + i + "> " + choicesArray[i][c] + "</input><br>");
    }
  }
}
questionnaire(questionBank, wrongChoices);

function timeConverter(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes === 0) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}

$(document).ready(function() {
  setTimeout(function() {
    alert('You have 60 sconds to answer these league of legends base questions!');
  }, 1000);
  time = 60;
  $("#timerDisplay").html("00:00");

  function clockView() {
    time--;
    currentTime = timeConverter(time);
    $("#timerDisplay").html(currentTime);
    

    if (time == 0) {
      for (var z = 0; z < questionBank.length; z++) {
        if ($('#question' + z + ':checked').val() == questionBank[z].answer) {
          rightAnswers++;
        } else if ($('#question' + z + ':checked').val() == undefined) {
          unanswered++;
        } else {
          wrongAnswers++;
        }
      }
      $('#questionBox').empty();
    $('#questionBox').append("<p>You got " + rightAnswers + " answers right!</p>");
      $('#questionBox').append("<p>You got " + wrongAnswers + " answers wrong.</p>");
      $('#questionBox').append("<p>There are " + unanswered + " unanswered questions remaining.</p>");
      time = undefined;
      $("#timerDisplay").html(currentTime);
    }
  }
  counter = setInterval(clockView, 1000);
})

console.log(rightAnswers);
console.log(wrongAnswers);
console.log(unanswered);

})(window);
