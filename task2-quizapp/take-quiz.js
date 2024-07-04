document.addEventListener('DOMContentLoaded', async () => {
    const quizSelect = document.getElementById('quiz-select');
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');

    let currentQuiz = null;
    let score = 0;
    let answeredQuestions = new Set();

    async function fetchQuizzes() {
        try {
            const response = await fetch('http://localhost:5000/api/quizzes');
            const quizzes = await response.json();
            populateQuizSelect(quizzes);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }
    }

    function populateQuizSelect(quizzes) {
        quizzes.forEach(quiz => {
            const option = document.createElement('option');
            option.value = quiz._id;
            option.textContent = quiz.title;
            quizSelect.appendChild(option);
        });

        quizSelect.addEventListener('change', loadQuiz);
    }

    async function loadQuiz() {
        const selectedQuizId = quizSelect.value;
        if (!selectedQuizId) return;

        try {
            const response = await fetch(`http://localhost:5000/api/quizzes/${selectedQuizId}`);
            currentQuiz = await response.json();
            displayQuiz(currentQuiz);
        } catch (error) {
            console.error('Failed to load quiz:', error);
        }
    }

    function displayQuiz(quiz) {
        quizContainer.innerHTML = '';
        score = 0;
        answeredQuestions.clear();
        quiz.questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';

            questionElement.innerHTML = `
                <h3>${index + 1}. ${question.questionText}</h3>
                <ul id="question-${index}">
                    ${question.options.map((option, i) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${i}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
                <div class="feedback" id="feedback${index}"></div>
            `;

            quizContainer.appendChild(questionElement);

            // Attach event listeners to each option
            const options = document.querySelectorAll(`#question-${index} input`);
            options.forEach(option => {
                option.addEventListener('click', () => handleOptionClick(index, option.value));
            });
        });

        quizContainer.style.display = 'block';
        updateQuizResults();
    }

    function handleOptionClick(questionIndex, selectedOption) {
        const question = currentQuiz.questions[questionIndex];
        const feedbackElement = document.getElementById(`feedback${questionIndex}`);
        const selectedOptionIndex = parseInt(selectedOption);
        
        if (answeredQuestions.has(questionIndex)) {
            feedbackElement.textContent = `You have already answered this question. The correct answer is: ${question.options[question.correctAnswer]}`;
            feedbackElement.className = 'feedback info';
            return;
        }

        if (selectedOptionIndex === question.correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'feedback correct';
            score++;
        } else {
            feedbackElement.textContent = `Wrong! Correct answer is: ${question.options[question.correctAnswer]}`;
            feedbackElement.className = 'feedback wrong';
        }

        // Mark question as answered
        answeredQuestions.add(questionIndex);

        // Update score display
        updateQuizResults();
    }

    function updateQuizResults() {
        quizResults.innerHTML = `Your current score: ${score} out of ${answeredQuestions.size}`;
    }

    fetchQuizzes();
});
