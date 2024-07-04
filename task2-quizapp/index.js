const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


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


app.use(bodyParser.json());

app.post('/api/quiz', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve quizzes' });
    }
});

app.get('/api/quizzes/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
