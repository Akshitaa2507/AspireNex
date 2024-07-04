document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const questionsList = document.getElementById('questions-list');
    const submitQuizBtn = document.getElementById('submit-quiz');

    let questions = [];

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addQuestion();
    });

    submitQuizBtn.addEventListener('click', async () => {
        if (questions.length > 0) {
            await submitQuiz();
        } else {
            alert('You need to add at least one question before submitting the quiz.');
        }
    });

    function addQuestion() {
        const title = document.getElementById('title').value.trim();
        const questionText = document.getElementById('question').value.trim();
        const option1 = document.getElementById('option1').value.trim();
        const option2 = document.getElementById('option2').value.trim();
        const option3 = document.getElementById('option3').value.trim();
        const option4 = document.getElementById('option4').value.trim();
        const correctAnswer = document.getElementById('correct-answer').value;

        // Convert correctAnswer to a number and validate
        const correctAnswerIndex = parseInt(correctAnswer, 10);

        // Validate that all fields are filled and correctAnswer is a valid index
        if (!title || !questionText || !option1 || !option2 || !option3 || !option4 || isNaN(correctAnswerIndex)) {
            alert('Please fill in all fields and ensure the correct answer is selected.');
            return;
        }

        if (correctAnswerIndex < 0 || correctAnswerIndex > 3) {
            alert('Correct answer must be between 0 and 3 (inclusive).');
            return;
        }

        const question = {
            questionText,
            options: [option1, option2, option3, option4],
            correctAnswer: correctAnswerIndex // Store correctAnswer as a number
        };

        questions.push(question);
        renderQuestionsList();
        resetForm();
    }

    function renderQuestionsList() {
        questionsList.innerHTML = '';

        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-item';
            questionElement.innerHTML = `
                <h3>Question ${index + 1}: ${q.questionText}</h3>
                <ul>
                    <li>Option 1: ${q.options[0]}</li>
                    <li>Option 2: ${q.options[1]}</li>
                    <li>Option 3: ${q.options[2]}</li>
                    <li>Option 4: ${q.options[3]}</li>
                </ul>
                <p>Correct Answer: Option ${q.correctAnswer + 1}</p> <!-- Adding 1 for display purposes -->
            `;
            questionsList.appendChild(questionElement);
        });

        if (questions.length > 0) {
            submitQuizBtn.style.display = 'block';
        }
    }

    function resetForm() {
        document.getElementById('question').value = '';
        document.getElementById('option1').value = '';
        document.getElementById('option2').value = '';
        document.getElementById('option3').value = '';
        document.getElementById('option4').value = '';
        document.getElementById('correct-answer').value = '0';
    }

    async function submitQuiz() {
        const title = document.getElementById('title').value.trim();
        const quizData = {
            title,
            questions
        };

        try {
            const response = await fetch('http://localhost:5000/api/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quizData)
            });

            if (response.ok) {
                alert('Quiz created successfully!');
                document.getElementById('title').value = '';
                questions = [];
                renderQuestionsList();
                submitQuizBtn.style.display = 'none';
            } else {
                alert('Failed to create quiz');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
});