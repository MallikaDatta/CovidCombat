// global vars
var avatar = 1;
var right = 0;
var wrong = 0;
const questionsNumber = questions.length;
var canvas;
var ctx;
var avatarImg;
var germImg;
const sections = 15;
const unitWidth = window.innerWidth / sections;
// functions
function chooseAvatar(choice) {
    avatar = choice;
    $(".avatar-img").attr("src", `assets/avatar${avatar}.jpeg`);
    setDisplay("#avatar", "#character");
    updateCanvas(0, 2 * unitWidth);
}

function makeQuestion(questionId, questionJson) {
    var questionString = `<div id="question${questionId}" class="hide question">
    <p>${questionJson.question}</p>
    <button onclick=manageScore(0,${questionJson.correct},${questionId})>${
    questionJson.answers[0]
  }</button>
    <button onclick=manageScore(1,${questionJson.correct},${questionId})>${
    questionJson.answers[1]
  }</button>
    <button onclick=manageScore(2,${questionJson.correct},${questionId})>${
    questionJson.answers[2]
  }</button>
    <button onclick=manageScore(3,${questionJson.correct},${questionId})>${
    questionJson.answers[3]
  }</button>
    <p id="right-answer" class="hide" style="text-align:center;"> <b> CORRECT ANSWER: ${
      questionJson.answers[questionJson.correct]
    }
      </b>
      <br>
      <button id="move-on" onclick="quizQuestionManipulation(${questionId})">NEXT</button>
    </p>
  </div>`;
    var questionDOM = $.parseHTML(questionString);

    return questionDOM[0];
}

function quizQuestionManipulation(questionId) {
    if (questionId !== questionsNumber) {
        setDisplay(`#question${questionId}`, `#question${questionId + 1}`);
    }
    if (right === 10) {
        setDisplay("#questions", "#end-success");
    } else if (right - wrong == -2) {
        setDisplay("#questions", "#end-failure");
    }
}

function manageScore(currentOption, rightOption, questionId) {
    if (currentOption == rightOption) {
        right += 1;
    } else {
        wrong += 1;
    }
    updateCanvas(wrong * unitWidth, (right + 2) * unitWidth);
    $(`#question${questionId} #right-answer`).removeClass("hide");
    $(`#question${questionId} button`).attr("disabled", true);
    $(`#question${questionId} #move-on`).attr("disabled", false);
}

function updateCanvas(germNewPosition, avatarNewPosition) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatarImg, avatarNewPosition, 0, 100, 100);
    ctx.drawImage(germImg, germNewPosition, 0, 100, 100);
}

$(document).ready(() => {
    for (let i = 0; i < questionsNumber; i++) {
        var currQuestion = questions[i];
        var currQuestionNode = makeQuestion(i, currQuestion);
        var questionsNode = document.getElementById("questions");
        questionsNode.appendChild(currQuestionNode);
    }
    // $(".avatar-img").attr("src", `assets/avatar${avatar}.jpeg`);

    $("#question0").removeClass("hide");
    canvas = document.getElementById("race-track-canvas");
    ctx = canvas.getContext("2d");
    ctx.fillRect(25, 25, 100, 100);
    canvas.width = window.innerWidth; // in pixels
    canvas.height = 101;

    avatarImg = document.getElementById("avatar-img");
    germImg = document.getElementById("germ");
    // ctx.drawImage(img, 2 * unitWidth, 0, 100, 100);
});