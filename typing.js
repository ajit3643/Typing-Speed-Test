const sentences =
    `The quick brown fox jumps over the lazy dog . Sphinx of black quartz, judge my vow . Pack my box with five dozen liquor jugs . How vexingly quick daft zebras jump !`;

let currentSentenceIndex = 0;
let startTime, endTime;
let timerInterval;
const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");

function startTest() {
    sentenceElement.innerHTML = sentences;
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    startButton.disabled = true;
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    setTimeout(endTest, 30000);
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const remainingTime = 30 - elapsedTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function endTest() {
    clearInterval(timerInterval);
    endTime = new Date();
    const elapsedTime = Math.floor((endTime - startTime) / 1000);
    const typedSentence = inputElement.value.trim();
    const correctSentence = sentenceElement.textContent.trim();
    let speed = 0;
    let typedWords = [];
    if (typedSentence != "") {
        typedWords = typedSentence.split(" ");
    }
    const correctWords = correctSentence.split(" ");
    console.log(correctWords);
    let correctCount = 0;
    let ind = 0;
    typedWords.forEach((word, index) => {
        if (word === correctWords[index]) {
            correctCount++;
            ind = index;
        }
    });
    if (typedSentence != "") {
        speed = Math.floor(((correctCount) / 30) * 60);
    }
    const accuracy = (correctCount / correctWords.length) * 100;
    speedElement.textContent = speed;
    accuracyElement.textContent = accuracy.toFixed(2);
    resultElement.style.display = "block";
    retryButton.focus();
}
startButton.addEventListener("click", startTest);
retryButton.addEventListener("click", () => {
    resultElement.style.display = "none";
    startButton.disabled = false;
    inputElement.value = "";
});