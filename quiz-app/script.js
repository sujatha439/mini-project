// 5 Questions Dataset
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Management Language"
    ],
    correct: 0,
    explanation: "HTML (Hyper Text Markup Language) is the standard markup language used to structure web pages."
  },
  {
    question: "Which programming language is known as the scripting language for the Web?",
    options: [
      "Python",
      "JavaScript",
      "C++",
      "Java"
    ],
    correct: 1,
    explanation: "JavaScript is the primary client-side scripting language used across all modern web browsers."
  },
  {
    question: "Which CSS property is used to change the background color of an element?",
    options: [
      "color",
      "bgcolor",
      "background-color",
      "canvas-color"
    ],
    correct: 2,
    explanation: "The 'background-color' property sets the background color of an HTML element."
  },
  {
    question: "What does DOM stand for in web development?",
    options: [
      "Desktop Operating Mode",
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinance Map"
    ],
    correct: 1,
    explanation: "The Document Object Model (DOM) is an API interface that represents HTML or XML documents as a tree structure."
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: [
      "<!-- -->",
      "/* */",
      "#",
      "//"
    ],
    correct: 3,
    explanation: "Double forward slashes (//) indicate a single-line comment in JavaScript."
  }
];

// App State
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// DOM References
const questionCountEl = document.getElementById("questionCount");
const liveScoreEl = document.getElementById("liveScore");
const progressBarEl = document.getElementById("progressBar");
const questionTextEl = document.getElementById("questionText");
const optionsContainerEl = document.getElementById("optionsContainer");
const feedbackBannerEl = document.getElementById("feedbackBanner");
const nextBtn = document.getElementById("nextBtn");

const quizBodyEl = document.getElementById("quizBody");
const progressSectionEl = document.getElementById("progressSection");
const resultsContainerEl = document.getElementById("resultsContainer");

const finalScoreEl = document.getElementById("finalScore");
const accuracyRateEl = document.getElementById("accuracyRate");
const statusLabelEl = document.getElementById("statusLabel");
const resultHeadingEl = document.getElementById("resultHeading");
const resultMessageEl = document.getElementById("resultMessage");
const resultIconEl = document.getElementById("resultIcon");
const reviewListEl = document.getElementById("reviewList");
const restartBtn = document.getElementById("restartBtn");

const optionLetters = ["A", "B", "C", "D"];

// Initialize Quiz
function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  quizBodyEl.style.display = "block";
  progressSectionEl.style.display = "block";
  resultsContainerEl.style.display = "none";

  loadQuestion();
}

// Load Question at Current Index
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;

  // Update Header & Progress
  questionCountEl.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
  liveScoreEl.textContent = `Score: ${score}`;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBarEl.style.width = `${progressPercent}%`;

  // Update Question Text
  questionTextEl.textContent = currentQuestion.question;

  // Clear previous options and feedback
  optionsContainerEl.innerHTML = "";
  feedbackBannerEl.className = "feedback-banner";
  feedbackBannerEl.textContent = "";

  // Reset Next Button
  nextBtn.disabled = true;
  if (currentQuestionIndex === totalQuestions - 1) {
    nextBtn.querySelector("span").textContent = "See Results";
  } else {
    nextBtn.querySelector("span").textContent = "Next Question";
  }

  // Create Option Buttons
  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.setAttribute("type", "button");
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");

    button.innerHTML = `
      <span class="option-letter">${optionLetters[index]}</span>
      <span class="option-text">${escapeHtml(optionText)}</span>
    `;

    button.addEventListener("click", () => handleOptionSelection(index));
    optionsContainerEl.appendChild(button);
  });
}

// Handle User Option Click
function handleOptionSelection(selectedIndex) {
  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.correct;
  const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");

  // Disable all option buttons to prevent multiple clicks
  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;

    if (idx === currentQuestion.correct) {
      btn.classList.add("correct");
      btn.setAttribute("aria-checked", "true");
    }

    if (idx === selectedIndex && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  // Update Score and Record Answer
  if (isCorrect) {
    score++;
    liveScoreEl.textContent = `Score: ${score}`;
    feedbackBannerEl.className = "feedback-banner correct show";
    feedbackBannerEl.innerHTML = `<span>✓</span> Correct! Well done.`;
  } else {
    feedbackBannerEl.className = "feedback-banner incorrect show";
    feedbackBannerEl.innerHTML = `<span>✕</span> Incorrect. The correct answer was <strong>${escapeHtml(currentQuestion.options[currentQuestion.correct])}</strong>.`;
  }

  userAnswers.push({
    question: currentQuestion.question,
    selected: currentQuestion.options[selectedIndex],
    correctAnswer: currentQuestion.options[currentQuestion.correct],
    isCorrect: isCorrect
  });

  // Enable Next button
  nextBtn.disabled = false;
  nextBtn.focus();
}

// Next Button Click Handler
function handleNext() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

// Show Results Screen
function showResults() {
  quizBodyEl.style.display = "none";
  progressSectionEl.style.display = "none";
  resultsContainerEl.style.display = "block";

  const total = quizData.length;
  const accuracy = Math.round((score / total) * 100);

  finalScoreEl.textContent = score;
  accuracyRateEl.textContent = `${accuracy}%`;

  // Performance message and icon styling
  if (score === 5) {
    resultIconEl.textContent = "🏆";
    resultHeadingEl.textContent = "Flawless Victory!";
    resultMessageEl.textContent = "Perfect score! You truly know your web technologies inside out.";
    statusLabelEl.textContent = "Master";
    statusLabelEl.style.color = "#10b981";
  } else if (score >= 3) {
    resultIconEl.textContent = "🎉";
    resultHeadingEl.textContent = "Great Job!";
    resultMessageEl.textContent = "Solid performance! You have a great foundation in web development.";
    statusLabelEl.textContent = "Passed";
    statusLabelEl.style.color = "#6366f1";
  } else {
    resultIconEl.textContent = "💡";
    resultHeadingEl.textContent = "Keep Practicing!";
    resultMessageEl.textContent = "Good try! Review the answers below and give it another shot.";
    statusLabelEl.textContent = "Needs Review";
    statusLabelEl.style.color = "#f59e0b";
  }

  // Populate Review List
  reviewListEl.innerHTML = "";
  userAnswers.forEach((ans, idx) => {
    const item = document.createElement("div");
    item.className = "review-card";
    item.innerHTML = `
      <div class="review-header">
        <span class="review-q-num">Q${idx + 1}</span>
        <span class="review-status-badge ${ans.isCorrect ? 'pass' : 'fail'}">
          ${ans.isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>
      <div class="review-q-text">${escapeHtml(ans.question)}</div>
      <div class="review-ans-details">
        Your answer: <span>${escapeHtml(ans.selected)}</span>
        ${!ans.isCorrect ? `<br />Correct answer: <span style="color:#059669">${escapeHtml(ans.correctAnswer)}</span>` : ''}
      </div>
    `;
    reviewListEl.appendChild(item);
  });
}

// Helper: Escape HTML to prevent injection
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Event Listeners
nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", initQuiz);

// Start on load
document.addEventListener("DOMContentLoaded", initQuiz);
