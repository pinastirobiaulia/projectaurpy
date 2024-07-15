// const express = require("express");
const diskusiRoutes = require("express").Router();
const {
  // addQuestion,
  // getAllQuestions,
  // getQuestionById,
  // addReply,
  // upvoteQuestion,
  // downvoteQuestion,
  getTopics,
  createTopic,
  getDiscussions,
  createDiscussion,
  getReplies,
  createReply,
  searchDiscussions,
} = require("../controller/discussionController");
const { authenticateUser } = require("../middleware/auth");
const { verifyToken, verifyRole2 } = require("../middleware/auth");

//tambahan
// Logging di rute diskusi
// diskusiRoutes.use((req, res, next) => {
//   console.log(`Diskusi route hit: ${req.method} ${req.url}`);
//   next();
// });

// const router = express.Router();

// const connectDB = require("../database");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(
//   cors({
//     // origin: "https://h-forum.vercel.app",
//     credentials: true,
//   })
// );

// diskusiRoutes.get("/", getRoot);
// // diskusiRoutes.post("/signup", createUser);
// // diskusiRoutes.post("/login", loginUser);
// diskusiRoutes.post("/ask-question", addQuestion);
// diskusiRoutes.post("/answer/:id", answerQuestion);
// diskusiRoutes.get("/questions", getQuestions);
// diskusiRoutes.post("/upvote/:id", upvoteQuestion); 
// diskusiRoutes.post("/downvote/:id", downvoteQuestion);
// diskusiRoutes.get("/allusers", getUsers);
// diskusiRoutes.get("/my-questions/:id", getMyQuestions);
// diskusiRoutes.get("/find/:topic", findQuestionsByTopic);

// diskusiRoutes.use("/", reqError);

//lama
// diskusiRoutes.post("/questions", addQuestion);
// diskusiRoutes.get("/questions", getAllQuestions);
// diskusiRoutes.get("/questions/:id", getQuestionById);
// diskusiRoutes.post("/questions/:id/replies", addReply);

// diskusiRoutes.post("/questions/:id/upvote", upvoteQuestion);
// diskusiRoutes.post("/questions/:id/downvote", downvoteQuestion);


diskusiRoutes.get('/topics', getTopics);

diskusiRoutes.get('/discussions', getDiscussions);
diskusiRoutes.post('/discussions/buat', createDiscussion);

diskusiRoutes.get('/discussions/:id/replies', getReplies);
diskusiRoutes.post('/discussions/:id/replies', createReply);

diskusiRoutes.get('/discussions/search', searchDiscussions);
module.exports = diskusiRoutes;

// const server = app.listen(PORT, () => {
//   connectDB();
//   // deleteAll(); Uncomment if needed to clear data on startup
//   console.log(`Server running on port ${PORT}`);
//   initServer(server);
// });

// module.exports = app;
