//create high score page
// score = sec
//form for adding name
//buttons for 
    //reset (take to start page (unhide span))
        //takes you to a high score list ordered by highest score
    //save
    //return to main menu
    //highscore list


//Quiz global variables
let startButton = document.querySelector('#start-btn');
let nextButton = document.querySelector('#next-btn');
let startQuiz = document.querySelector('.start-quiz');
let questionContainerElement = document.querySelector('#question-container');
let questionElement = document.querySelector('#question');
let answerButtonsElement = document.querySelector('#answer-buttons');
let questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4', correct: true },
            {text: '22', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4', correct: true },
            {text: '6', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4', correct: true },
            {text: '15', correct: false }
        ]
    }
];

let shuffledQuestions;
let currentQuestionIndex;


//click to start the game
startButton.addEventListener('click', startGame);
nextButton.addEventListener("click", incrementIndex);

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
/*need to change the else code to go to the high scores page*/
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
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
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
    timingBox.classList.remove('hide');
    var sec = 75;
    var timer = setInterval(function(){
        countDown.innerHTML = "Time: " + sec + "sec left";
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}