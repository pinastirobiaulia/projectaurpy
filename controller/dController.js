const express = require("express");
// const connectDB = require("../database");
const User = require("../models/users");
const Question = require("../models/question");
const Reply = require("../models/reply");
const cors = require("cors");
const { Server } = require("socket.io");

// const { Question } = require("../models/question");
// const { Reply } = require("../models/reply");

//komen dl
// const addQuestion = async (req, res) => {
//     const { question, description, author, tags } = req.body;
//     try { 
//         const newQuestion = new Question({
//             question,
//             description,
//             author,
//             replies: [],
//             tags,
//             // upvote: [],
//             // downvote: [],
//         });
//         const savedQuestion = await newQuestion.save();
//         res.status(201).json(savedQuestion);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// const getAllQuestions = async (req, res) => {
//     try {
//         const questions = await Question.find();
//         res.status(200).json(questions);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// const getQuestionById = async (req, res) => {
//     try {
//         const question = await Question.findById(req.params.id);
//         if (!question) return res.status(404).json({ message: "Question not found" });
//         res.status(200).json(question);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// const addReply = async (req, res) => {
//     const { reply, author } = req.body;
//     try {
//         const newReply = new Reply({ reply, author });
//         const savedReply = await newReply.save();

//         const question = await Question.findById(req.params.id);
//         if (!question) return res.status(404).json({ message: "Question not found" });

//         question.replies.push(savedReply._id);
//         await question.save();

//         res.status(201).json(savedReply);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };


//baru
const addQuestion = async (req, res) => {
    const { question, description, author, tags } = req.body;
    console.log('Data diterima:', req.body);
    try {
        const newQuestion = new Question({
            question,
            description,
            author,
            replies: [],
            tags,
            // upvote: [],
            // downvote: [],
        });
        console.log('Pertanyaan baru:', newQuestion);
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        console.error('Kesalahan saat menyimpan pertanyaan:', err);
        res.status(400).json({ message: err.message });
    }
};

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: "Pertanyaan tidak ditemukan" });
        res.status(200).json(question);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const addReply = async (req, res) => {
    const { reply, author } = req.body;
    try {
        const newReply = new Reply({ reply, author });
        const savedReply = await newReply.save();

        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: "Pertanyaan tidak ditemukan" });

        question.replies.push(savedReply._id);
        await question.save();

        res.status(201).json(savedReply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// const upvoteQuestion = async (req, res) => {
//     try {
//         const question = await Question.findById(req.params.id);
//         if (!question) return res.status(404).json({ message: "Question not found" });

//         if (!question.upvote.includes(req.body.userId)) {
//             question.upvote.push(req.body.userId);
//             question.downvote = question.downvote.filter(id => id !== req.body.userId);
//             await question.save();
//         }

//         res.status(200).json({ message: "Question upvoted" });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// const downvoteQuestion = async (req, res) => {
//     try {
//         const question = await Question.findById(req.params.id);
//         if (!question) return res.status(404).json({ message: "Question not found" });

//         if (!question.downvote.includes(req.body.userId)) {
//             question.downvote.push(req.body.userId);
//             question.upvote = question.upvote.filter(id => id !== req.body.userId);
//             await question.save();
//         }

//         res.status(200).json({ message: "Question downvoted" });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestionById,
    addReply,
    // upvoteQuestion,
    // downvoteQuestion,
};
