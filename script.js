let questions = [];

const loadQuestions = () => {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      startQuiz();
    })
    .catch((error) => console.error("Error loading questions", error));
};

const questionElement = document.getElementById("question");
const choicesButton = document.getElementById("choices-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let marks = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  marks = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNum = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.innerHTML = choice.text;
    button.classList.add("btn");
    choicesButton.appendChild(button);
    if (choice.answer) {
      button.dataset.answer = choice.answer;
    }
    button.addEventListener("click", selectedChoice);
  });
};

const resetState = () => {
  nextButton.style.display = "none";
  while (choicesButton.firstChild) {
    choicesButton.removeChild(choicesButton.firstChild);
  }
};

const selectedChoice = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.answer === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    marks++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(choicesButton.children).forEach((button) => {
    if (button.dataset.answer === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

const showResult = () => {
  resetState();
  questionElement.innerHTML = `You got ${marks} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

loadQuestions();
