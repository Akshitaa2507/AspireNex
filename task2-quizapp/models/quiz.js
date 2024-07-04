const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
}, { _id: false });

const quizSchema = new Schema({
    title: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
