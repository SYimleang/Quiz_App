let questions = [];
const questionElement = document.getElementById("question");
const choicesButton = document.getElementById("choices-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let marks = 0;

// Load questions and answers from JSON file
const loadQuestions = () => {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      startQuiz();
    })
    .catch((error) => console.error("Error loading questions", error));
};

// Initialize the application
const startQuiz = () => {
  currentQuestionIndex = 0;
  marks = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

// Display question and choices
const showQuestion = () => {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNum = currentQuestionIndex + 1;
  questionElement.textContent = questionNum + ". " + currentQuestion.question;

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("btn");
    choicesButton.appendChild(button);
    if (choice.answer) {
      button.dataset.answer = choice.answer;
    }
    button.addEventListener("click", selectedChoice);
  });
};

// Reset all buttons
const resetState = () => {
  nextButton.style.display = "none";
  while (choicesButton.firstChild) {
    choicesButton.innerHTML = "";
  }
};

// Handle button style when clicked
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

// Clicked Next button handling
const handleNextButton = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  // Display result after finished the quiz
const showResult = () => {
  resetState();
  questionElement.innerHTML = `You got ${marks} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

nextButton.addEventListener("click", handleNextButton => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

loadQuestions();
