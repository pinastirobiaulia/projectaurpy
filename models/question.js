const mongoose = require("mongoose");
const User = require("./users"); // Mengimpor model User
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "User",
    },
    replies: {
      type: [String],
      ref: "Reply",
      // default: [],
      required: true,
    },
    tags: {
      type: [String],
      // default: [],
      required: true,
    },
    // upvote: {
    //   type: [String],
    //   // ref: "DiscussionUser",
    //   // default: [],
    //   required: true,
    // },
    // downvote: {
    //   type: [String],
    //   // ref: "DiscussionUser",
    //   // default: [],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

//module.exports = { Question, ObjectId };

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question; 
