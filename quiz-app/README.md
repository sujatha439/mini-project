# Interactive Quiz App (HTML, CSS & JavaScript)

A modern, responsive, 5-question Quiz application built with vanilla HTML5, CSS3, and modern JavaScript.

## Features

- **5 Curated Questions**: Covering web fundamentals (HTML, JavaScript, CSS, DOM, syntax).
- **Interactive Feedback**:
  - Highlights correct answers in green and mistakes in red immediately upon selection.
  - Explanatory feedback message for each answer.
  - Prevents double-clicking or changing answers once submitted.
- **Dynamic Progress Bar & Live Counter**: Visual indicator showing current question (e.g., "Question 2 of 5") and real-time score updates.
- **Comprehensive Score Screen**:
  - Displays total score (`X / 5`) and accuracy percentage.
  - Dynamic performance badges & titles (Master / Passed / Needs Review).
  - Question-by-question breakdown showing your selected response vs. the correct answer.
  - "Retake Quiz" button to reset and replay seamlessly.
- **Polished Glassmorphism UI**: Beautiful animated backdrop blobs, responsive typography, and mobile-friendly layout.

## Project Structure

```text
quiz-app/
├── index.html       # Quiz layout, markup & accessibility attributes
├── style.css        # Responsive styling, gradients & animations
├── script.js        # Quiz logic, state management, question data & score calculation
└── README.md        # Documentation
```

## How to Run

1. Open `index.html` directly in any modern web browser (Double-click or drag into Chrome, Edge, Firefox, or Safari).
2. Alternatively, serve with any local HTTP server (such as Live Server in VS Code, or `python -m http.server 8000`).
