const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// membuat schema

//const User = mongoose.model("User", {
  // _id: {
  //   type: String,
  //   required: true,
  //   default: function () {
  //     return new ObjectId().toString();
  //   },
  // },
const UserSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  resetCode: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User; 
