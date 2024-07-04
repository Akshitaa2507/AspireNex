// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    let quiz = [];
    
    const quizForm = document.getElementById('quiz-form');
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const submitQuizBtn = document.getElementById('submit-quiz');

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const question = document.getElementById('question').value;
        const option1 = document.getElementById('option1').value;
        const option2 = document.getElementById('option2').value;
        const option3 = document.getElementById('option3').value;
        const option4 = document.getElementById('option4').value;
        const correctAnswer = document.getElementById('correct-answer').value;

        const newQuestion = {
            question: question,
            options: [option1, option2, option3, option4],
            correctAnswer: correctAnswer
        };

        quiz.push(newQuestion);

        // Clear form
        quizForm.reset();

        alert('Question added successfully!');
    });

    submitQuizBtn.addEventListener('click', () => {
        quizContainer.innerHTML = '';
        quizResults.innerHTML = '';

        if (quiz.length === 0) {
            alert('No quiz available to take.');
            return;
        }

        quiz.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionTitle);

            q.options.forEach((option, i) => {
                const optionDiv = document.createElement('div');
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question-${index}`;
                optionInput.value = i + 1;
                const optionLabel = document.createElement('label');
                optionLabel.textContent = option;

                optionDiv.appendChild(optionInput);
                optionDiv.appendChild(optionLabel);
                questionDiv.appendChild(optionDiv);
            });

            quizContainer.appendChild(questionDiv);
        });

        const submitAnswersBtn = document.createElement('button');
        submitAnswersBtn.textContent = 'Submit Answers';
        submitAnswersBtn.addEventListener('click', () => {
            let score = 0;
            const totalQuestions = quiz.length;

            quiz.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);

                if (selectedOption && parseInt(selectedOption.value) === parseInt(q.correctAnswer)) {
                    score++;
                }
            });

            quizResults.innerHTML = `<h2>Your Score: ${score} / ${totalQuestions}</h2>`;
        });

        quizContainer.appendChild(submitAnswersBtn);
    });
});
