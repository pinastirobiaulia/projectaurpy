const mongoose = require("mongoose");
const User = require("./users"); // Mengimpor model User
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// import mongoose from "mongoose";
const ReplySchema = new mongoose.Schema({
// const replySchema = mongoose.Schema(
  // {
    reply: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//module.exports = { Reply, ObjectId };
//export default Reply;

const Reply = mongoose.model("Reply", ReplySchema);
module.exports = Reply; 
