/**
 * ============================================
 * MAIN ENTRY POINT (index.js)
 * ============================================
 *
 * This file is the starting point of your application.
 * It handles:
 * - Getting DOM elements
 * - Form validation
 * - Starting the quiz
 * - Loading/error states
 *
 * DOM ELEMENTS TO GET:
 * - quizOptionsForm: #quizOptions
 * - playerNameInput: #playerName
 * - categoryInput: #categoryMenu
 * - difficultyOptions: #difficultyOptions
 * - questionsNumber: #questionsNumber
 * - startQuizBtn: #startQuiz
 * - questionsContainer: .questions-container
 *
 * FUNCTIONS TO IMPLEMENT:
 * - showLoading() - Display loading spinner
 * - hideLoading() - Remove loading spinner
 * - showError(message) - Display error card
 * - validateForm() - Check if form is valid
 * - showFormError(message) - Show error on form
 * - resetToStart() - Reset to initial state
 * - startQuiz() - Main function to start quiz
 */

// ============================================
// TODO: Get DOM Element References
// ============================================
// Use document.getElementById() and document.querySelector()

// ============================================
// TODO: Create variable to store current quiz
// ============================================
let objQuiz = null;

// ============================================
// TODO: Create showLoading() function
// ============================================
// Set questionsContainer.innerHTML to loading HTML
// See index.html for the HTML structure

// ============================================
// TODO: Create hideLoading() function
// ============================================
// Find and remove the loading overlay

// ============================================
// TODO: Create showError(message) function
// ============================================
// Set questionsContainer.innerHTML to error HTML
// Include the message parameter in the display
// Add click listener to retry button that calls resetToStart()

// ============================================
// TODO: Create validateForm() function
// ============================================
// Return object: { isValid: boolean, error: string | null }
// Check:
// 1. questionsNumber has a value
// 2. Value is >= 1 (minimum questions)
// 3. Value is <= 50 (maximum questions)

// ============================================
// TODO: Create showFormError(message) function
// ============================================
// Create error div with class 'form-error'
// Insert before the start button
// Remove after 3 seconds with fade effect

// ============================================
// TODO: Create resetToStart() function
// ============================================
// 1. Clear questionsContainer
// 2. Reset form values
// 3. Show the form (remove 'hidden' class)
// 4. Set currentQuiz = null

// ============================================
// TODO: Create async startQuiz() function
// ============================================
// This is the main function, called when Start button is clicked
//
// Steps:
// 1. Validate the form
// 2. If not valid, show error and return
// 3. Get form values:
//    - playerName (use 'Player' if empty)
//    - category
//    - difficulty
//    - numberOfQuestions
// 4. Create new Quiz instance
// 5. Hide the form (add 'hidden' class)
// 6. Show loading spinner
// 7. Try to fetch questions:
//    - await currentQuiz.getQuestions()
//    - Hide loading
//    - Check if questions exist
//    - Create first Question and display it
// 8. Catch any errors:
//    - Hide loading
//    - Show error message

// ============================================
// TODO: Add Event Listeners
// ============================================
// 1. startQuizBtn click -> call startQuiz()
// 2. questionsNumber keydown -> if Enter, call startQuiz()


import { Quiz } from "./quiz.js";
import { Question } from "./question.js";

const MainForm = document.getElementById("quizOptions");
const PlayerName = document.getElementById("playerName");
const category = document.getElementById("categoryMenu");
const DifficultyLevel = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const questionsDisplay = document.querySelector(".my-display");
const app_container = document.querySelector(".app-container");
const CategoryRead = document.getElementById("CategoryRead");
const level = document.getElementById("level");
const numberQues = document.getElementById("numberQues");
const timer = document.querySelector(".timer-value");
const question_text = document.querySelector(".question-text");
const LoadindDesign = document.querySelector(".loading-overlay");
const xp_value = document.querySelector(".xp-value");
const errorApi = document.querySelector(".error-card");



let timeLeft = 15;
let timeId = null;
let res;
let QuestionIndex = 0;

const firstBox = document.querySelector(".answer-text1");
const secondBox = document.querySelector(".answer-text2");
const thirdBox = document.querySelector(".answer-text3");
const fourthBox = document.querySelector(".answer-text4");

const MainBtn = document.getElementById("startQuiz");

let obj = {};

function userData() {
  obj = {
    user: PlayerName.value || "Player",
    categ: category.value,
    level: DifficultyLevel.value,
    number: questionsNumber.value,
  };
}

MainBtn.addEventListener("click", function () {
  startQuiz();
});

function getapi() {
  if (res == undefined) {
    
  }
  return new Promise(function (resolved, rejected) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://opentdb.com/api.php?amount=${obj.number}&difficulty=${obj.level}&category=${obj.categ}`,
    );

    xhr.send();
    xhr.responseType = "json";
    xhr.addEventListener("load", function () {
      res = xhr.response;
      console.log(res);
      if (res.results.length) {
        questionsDisplay.classList.remove("my-display");
        LoadindDesign.classList.add("hidden");
        displayInform(res.results);
      }
      resolved();
    });

    xhr.addEventListener("error", function () {
      if (res == null) {
        LoadindDesign.classList.add("hidden");
        errorApi.classList.remove("hidden");
      }
      console.log("error in api");
      rejected();
    });
  });
}

function displayInform(results) {
  objQuiz.currentQuestionIndex++;
  xp_value.innerHTML = `Question${objQuiz.currentQuestionIndex}/${res.results.length} `;

  CategoryRead.innerHTML = categoryMapping[obj.categ];
  level.innerHTML = obj.level;
  numberQues.innerHTML = `1/ ${results.length}`;
  question_text.innerHTML = ` ${results[0].question} `;
  // QuestionAnswer(results);
  // startQuestionTimer();
}

function startQuestionTimer() {
  timeLeft = 15;
  timeId = setInterval(() => {
    timeLeft--;
    timer.innerHTML = `${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timeId);
      QuestionIndex = QuestionIndex + 1;
      moveToNextQuestion(QuestionIndex);
    }
  }, 1000);
}

function moveToNextQuestion(index) {
  question_text.innerHTML = ` ${res.results[1].question} `;
  numberQues.innerHTML = `${index}/${res.results.length}`;
  xp_value.innerHTML = `Question${index}/${res.results.length} `;
  console.log(res);
}

function QuestionAnswer(res) {
  firstBox.innerHTML = `${res[0].correct_answer}`;

  for (let i = 0; i < res[0].incorrect_answers.length; i++) {
    console.log(i);
    let rand = Math.floor(Math.random() * i);
    console.log(rand);
    secondBox.innerHTML = `${res[0].incorrect_answers[0]}`;
    thirdBox.innerHTML = `${res[0].incorrect_answers[1]}`;
    fourthBox.innerHTML = `${res[0].incorrect_answers[2]}`;
  }
}

async function startQuiz() {
  userData();

  objQuiz = new Quiz(obj.categ, obj.level, obj.number, obj.PlayerName);

  MainForm.classList.add("my-display");
  app_container.classList.remove("app-container");
  LoadindDesign.classList.remove("hidden");

  const url = objQuiz.buildApiUrl(obj.number, obj.level, obj.categ);
 
  await objQuiz.getQuestions(url);

  if (objQuiz.questions.length) {
    questionsDisplay.classList.remove("my-display");
    LoadindDesign.classList.add("hidden");
    
    const firstQuestion = new Question(objQuiz, questionsDisplay, () => {});
    firstQuestion.displayQuestion();

  }

}
