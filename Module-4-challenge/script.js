// Quiz Questions
const questions = [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      choices: ["var", "let", "const"],
      answer: "var",
    },
    {
      question: "What is the result of '5' + 3 in JavaScript?",
      choices: ["53", "8", "53", "35"],
      answer: "53",
    },
    {
      question:
        "Which built-in method returns the characters in a string, beginning at the specified start position, and through the specified number of characters?",
      choices: ["substr()", "slice()", "substring()"],
      answer: "substr()",
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitButton = document.getElementById("submit-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreList = document.getElementById("score-list");
  
  // Display question and choices
  function displayQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";
  
    question.choices.forEach(function (choice) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", checkAnswer);
      choicesElement.appendChild(button);
    });
  }
  
  // Check if the selected answer is correct
  function checkAnswer(event) {
    const selectedChoice = event.target.textContent;
    const question = questions[currentQuestion];
  
    if (selectedChoice === question.answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  // End the quiz and display the score
  function endQuiz() {
    clearInterval(timer);
    questionElement.textContent = "Quiz Completed!";
    choicesElement.innerHTML = "";
    submitButton.style.display = "none";
    scoreContainer.style.display = "block";
  
    displayScores();
  }
  
  // Display the high scores
  function displayScores() {
    const playerName = prompt("Enter your name:");
    const scoreEntry = { name: playerName, score: score };
  
    let scores = JSON.parse(localStorage.getItem("highScores")) || [];
    scores.push(scoreEntry);
    scores.sort((a, b) => b.score - a.score);
  
    localStorage.setItem("highScores", JSON.stringify(scores));
  
    scoreList.innerHTML = "";
  
    scores.forEach(function (entry) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = entry.name;
      const scoreCell = document.createElement("td");
      scoreCell.textContent = entry.score;
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      scoreList.appendChild(row);
    });
  }
  
  // Timer countdown
  function countdown() {
    const timerElement = document.createElement("div");
    timerElement.textContent = "Time Left: " + timeLeft;
    document.body.appendChild(timerElement);
  
    const timer = setInterval(function () {
      timeLeft--;
      timerElement.textContent = "Time Left: " + timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }
  
  // Start the quiz
  displayQuestion();
  countdown();
  
  // Submit button event listener
  submitButton.addEventListener("click", checkAnswer);
  