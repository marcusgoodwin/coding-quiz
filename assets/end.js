const username = document.querySelector('#username');
const submitScoreBtn = document.querySelector('#submitScoreBtn');
const finalScore = document.querySelector('#finalScore');
// const lastScore = document.localStorage.getItem('lastScore');
const highScore = json.parse(localStorage.getItem('lastScore')) || []; 

const MAX_HIGH_SCORE = 6;

finalScore.innerText = lastScore.innerText;

username.addEventListener('keyup', () => {
    submitScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: lastScore,
        name: username.value,
    }

    highScore.push(score);

    highScore.sort((a,b) => {
        return b.score - a.score;
    })

    highScore.splice(6);

    localStorage.setItem('highScore', JSON.stringify(highScore));
    window.location.assign('/');
}