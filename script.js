const sampleTexts = {
  easy: [
    "The quick brown fox jumps over the lazy dog. Oh sure, he did it in order to fulfil usage of all the letters of the alphabet.",
  ],
  medium: [
    "Frontend development includes HTML, CSS, and JavaScript. HTML Stands for HYPER TEXT MARKUP LANGUAGE, CSS Stands for Cascading Style Sheets. Code with Ajit",
  ],
  hard: [
    "Advanced JavaScript concepts include closures, promises, and async-await.Advanced JavaScript concepts include closures, promises, and async-await.,Advanced JavaScript concepts include closures, promises, and async-await.",
  ],
};

const settings = document.getElementById("settings");
const test = document.getElementById("test");
const result = document.getElementById("result");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const progressBar = document.getElementById("progressBar");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const finalWPM = document.getElementById("finalWPM");
const finalAccuracy = document.getElementById("finalAccuracy");

const difficultySelect = document.getElementById("difficulty");
const durationSelect = document.getElementById("duration");

let timer = 0;
let duration = 0;
let interval = null;
let currentText = "";
let correctCharacters = 0;
let typedCharacters = 0;

function startTest() {
  timer = 0;
  correctCharacters = 0;
  typedCharacters = 0;

  duration = parseInt(durationSelect.value);
  currentText = sampleTexts[difficultySelect.value][0];

  textDisplay.textContent = currentText;
  textInput.value = "";
  textInput.disabled = false;
  textInput.focus();

  progressBar.style.width = "0%";
  timerDisplay.textContent = duration;

  settings.classList.remove("active");
  test.classList.add("active");

  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timer++;
  progressBar.style.width = `${(timer / duration) * 100}%`;
  timerDisplay.textContent = duration - timer;

  if (timer >= duration) {
    stopTest();
  }
}

function stopTest() {
  clearInterval(interval);
  textInput.disabled = true;

  const wordsTyped = textInput.value.trim().split(" ").length;
  const wpm = Math.round((wordsTyped / duration) * 60);
  const accuracy = ((correctCharacters / typedCharacters) * 100).toFixed(2);

  finalWPM.textContent = wpm;
  finalAccuracy.textContent = isNaN(accuracy) ? "0" : accuracy;

  test.classList.remove("active");
  result.classList.add("active");
}

startButton.addEventListener("click", startTest);

restartButton.addEventListener("click", () => {
  result.classList.remove("active");
  settings.classList.add("active");
});

textInput.addEventListener("input", () => {
  typedCharacters = textInput.value.length;
  correctCharacters = 0;

  for (let i = 0; i < textInput.value.length; i++) {
    if (textInput.value[i] === currentText[i]) {
      correctCharacters++;
    }
  }

  accuracyDisplay.textContent = (
    (correctCharacters / typedCharacters) *
    100
  ).toFixed(2);
  wpmDisplay.textContent = Math.round(
    (textInput.value.split(" ").length / timer) * 60
  );
});

// Prevent copy and paste events
textInput.addEventListener("copy", function (e) {
  e.preventDefault();
});

textInput.addEventListener("paste", function (e) {
  e.preventDefault();
});
