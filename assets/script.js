//Quiz global variables
let startButton = document.querySelector('#start-btn');
let nextButton = document.querySelector('#next-btn');
let startQuiz = document.querySelector('.start-quiz');
let questionContainerElement = document.querySelector('#question-container');
let questionElement = document.querySelector('#question');
let answerButtonsElement = document.querySelector('#answer-buttons');
let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "strings", correct: false }, 
            {text: "booleans", correct: false} ,
            {text: "alerts", correct: true },
            {text: "numbers", correct: false }
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: [
            {text: "quotes", correct: false },
            {text: "curly brackets", correct: false },
            {text: "parentheses", correct: true },
            {text: "square brackets", correct: false }
        ]
    },
    {
        question: "Select a String function that creates a string and display in a big font as if it were in a tag?",
        answers: [
            {text: "big()", correct: true },
            {text: "anchor()", correct: false },
            {text: "italics()", correct: false},
            {text: "blink()", correct: false}
        ]
    },
    {
        question:"What is the function of Array object that runs through each element of the array?",
        answers: [
            {text: "forEach()", correct: true },
            {text: "filter()", correct: false },
            {text: "every()", correct: false },
            {text: "concat()", correct: false }
        ]
    },
    {
        question: "What is the function of Array object that adds and/or removes elements from an array?",
        answers: [
            {text: "unshift()", correct: false },
            {text: "sort()", correct: false },
            {text: "toSource()", correct: false },
            {text: "splice()", correct: true }
        ]
    }
    ];

let shuffledQuestions;
let currentQuestionIndex;

//Start, end, and high score screen global variables
let highScoresButton = document.querySelector('.high-btn');
let saveButton = document.querySelector('.save-btn');
let startScreenButton = document.querySelector('.start-screen-btn');
let endScreen = document.querySelector('.end-screen');
let highScores = document.querySelector('.high-scores');


//click to start the game
startButton.addEventListener('click', startGame);
//click to go to next question
nextButton.addEventListener("click", incrementIndex);
//click to go to high scores
highScoresButton.addEventListener('click', getHigh);
//click to save your score to high score list
saveButton.addEventListener('click', saveScore);
//click to return to the start screen
startScreenButton.addEventListener('click', startScreen)



//QUIZ

function startGame() {
    //hide starting page
    //shuffle the questions so each quiz is different
    //start at the beginning of the question index
     //unhide the question container
    startQuiz.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    timer();
}

//set the next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    //write new question on page
    //write new answers on page; literally creating new buttons each time
    //add click event to each button checking if correct answer
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

//rehide the next button
//remove appended child buttons added during showQuestion function
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

//target an event (selecting an answer with click)
//check if correct
//if there are more questions to ask, unhide the next question
//if there are no more questions change start button to restart and unhide
/*need to change the else code to go to the high scores page
    .innerhtml of end-heading you win if timer > 0 or lose if <0*/
function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        questionContainerElement.classList.add('hide');
        endScreen.classList.remove('hide');
    }
}

//set the classes for wrong and right answers
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

//remove the classes added during the previous question
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

//increment the index so another question is pulled
function incrementIndex() {
    currentQuestionIndex++;
    setNextQuestion();
}


//TIMER

//add to  clear interval to go to high score page
//event to hide all other pages and bring up high score form
    //pulls the score and the local storage

//Timer global variables
let countDown = document.getElementById('timer');
let timingBox = document.querySelector('.timingBox');


function timer(){
    var sec = 75;
    var timer = setInterval(function(){
        countDown.innerHTML = "Time: " + sec + "sec";
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            questionContainerElement.classList.add('hide');
            endScreen.classList.remove('hide');
        }
    }, 1000);
}

//END SCREEN

// score = sec
//buttons for 
    //reset (take to start page (unhide span))
        //takes you to a high score list ordered by highest score
    //save 
    //highscore list

function saveScore() {
    let name = document.querySelector('.end-user-name');
    consolelog(name);
    endScreen.classList.add('hide');
    highScores.classList.remove('hide');

}



//HIGH SCORES

//unhide div high-scores
//pull high scores from local
//display top 5 in list and ordered greatest to least
function getHigh() {
    highScoresButton.classList.remove('hide');
    //hide all others?
}


//START SCREEN

function startScreen() {
    startQuiz.classList.remove('hide');
    //hide all others?
}