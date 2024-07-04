const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionText: String,
    options: [String],
    correctAnswer: Number
});

const quizSchema = new Schema({
    title: String,
    questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Sample quizzes data
const sampleQuizzes = [
    {
        title: 'General Knowledge',
        questions: [
            {
                questionText: 'What is the capital of France?',
                options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
                correctAnswer: 2
            },
            {
                questionText: 'Who wrote "To Kill a Mockingbird"?',
                options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
                correctAnswer: 0
            },
            {
                questionText: 'What is the largest planet in our Solar System?',
                options: ['Earth', 'Jupiter', 'Saturn', 'Neptune'],
                correctAnswer: 1
            }
        ]
    },
    {
        title: 'Science',
        questions: [
            {
                questionText: 'What is the chemical symbol for water?',
                options: ['H2O', 'O2', 'CO2', 'H2O2'],
                correctAnswer: 0
            },
            {
                questionText: 'Who developed the theory of relativity?',
                options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Niels Bohr'],
                correctAnswer: 1
            },
            {
                questionText: 'What is the powerhouse of the cell?',
                options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
                correctAnswer: 2
            }
        ]
    },
    {
        title: 'Mathematics',
        questions: [
            {
                questionText: 'What is the value of Pi (π) up to two decimal places?',
                options: ['2.14', '3.14', '1.41', '2.71'],
                correctAnswer: 1
            },
            {
                questionText: 'What is the square root of 64?',
                options: ['6', '7', '8', '9'],
                correctAnswer: 2
            },
            {
                questionText: 'What is 5 factorial (5!)?',
                options: ['120', '60', '20', '10'],
                correctAnswer: 0
            }
        ]
    }
];

// Connect to MongoDB and save sample quizzes
mongoose.connect('mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Clear existing quizzes
        await Quiz.deleteMany({});

        // Save sample quizzes
        for (const quizData of sampleQuizzes) {
            const quiz = new Quiz(quizData);
            await quiz.save();
            console.log(`Saved quiz: ${quiz.title}`);
        }

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
