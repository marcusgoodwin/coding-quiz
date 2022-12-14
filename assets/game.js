const question = document.querySelector('#question');
const option = Array.from(document.querySelectorAll('.option-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const trackProgressFull = document.querySelector('#trackProgressFull');
const countDown= document.querySelector('#countDown');
var timeLeft = 90;
var countdownTimer = () => setInterval(function() {
    if(timeLeft <= 0){
        endGame()
        clearInterval(countdownTimer);
    }
    timeLeft--
    countDown.innerText = timeLeft
}, 1000);



endGame = () => { 
    window.location.href = 'end.html';
}

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'How long was JavaScript in development?',
        optionA: '10 years',
        optionB: '1 month',
        optionC: '1 week',
        optionD: '10 days',
        answer: 'D',
    },
    {
        question: 'What would be considered a boolean value?',
        optionA: '276',
        optionB: 'True',
        optionC: '3',
        optionD: '13',
        answer: 'B',
    },
    {
        question: 'Who is the father of computer science?',
        optionA: 'Albert Einstein',
        optionB: 'Allen Turing',
        optionC: 'Gilbert Godfrey',
        optionD: 'Bill Gates',
        answer: 'B',
    },
    {
        question: 'What was the first message displayed on the Internet?',
        optionA: 'Hello world',
        optionB: 'Hi dad!',
        optionC: '101010101010101000111100101',
        optionD: 'Goodbye',
        answer: 'A',
    },
    {
        question: 'What is considered to be the most complex coding language?',
        optionA: 'JavaScript',
        optionB: 'HTML',
        optionC: 'Malbolge',
        optionD: 'CSS',
        answer: 'C',
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

commenceQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions()
    countdownTimer()
}

// formatAnswer = (answer, element) => {
//     if (typeof answer === Array) {
//         currentQuestion.answer =
//     }
// }

console.log(option)

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    trackProgressFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

console.log(currentQuestion, questionIndex);

    option.forEach(choice => {
        const number = choice.dataset['letter'];
        choice.innerText = currentQuestion['option' + number]
    })


    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

decrementTimer = () => {
    const decrement = timeLeft - 15
    if (decrement <= 0){
        timeLeft = 0;
        endGame();
        return}
    timeLeft = decrement
}

option.forEach(choice => {
    choice.addEventListener('click', e => {
            if(!acceptingAnswers) return; 

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['letter'];

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

// console.log('classToApply', classToApply, selectedAnswer, currentQuestion.answer)

            if(classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
            } else {
                decrementTimer(SCORE_POINTS);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout (() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestions();

            }, 1000)
})

})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
commenceQuiz()

// json to finish this js
// localStorage.setItem('