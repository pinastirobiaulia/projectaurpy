const userRoutes = require("express").Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  reqError,
  login,
  ubahRoleUser,
  searchUser,
  // reqPasswordReset,
  // resetPassword,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} = require("../controller/userController"); 
const { verifyToken, verifyRole1 } = require("../middleware/auth");

userRoutes.post("/login", login);
// userRoutes.use((req, res, next) => {
//   const token = req.token;
// });

userRoutes.get("/users",   getAllUsers);
userRoutes.get("/searchUser",   searchUser);
userRoutes.get("/users/:id",   getUserById);
userRoutes.post("/tambahUser", addUser);
userRoutes.delete("/hapusUser/:id",  deleteUser);
userRoutes.put("/ubahRoleUser/:id",  ubahRoleUser);
userRoutes.put("/ubahRoleUser/:id",  ubahRoleUser);
// userRoutes.post("/req-reset-password", reqPasswordReset);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/verify-reset-code", verifyResetCode);
userRoutes.post("/reset-password", resetPassword);
// userRoutes.post("/change-password/:id/:token", resetPassword);

// userRoutes.get("/users", verifyToken, verifyRole1, getAllUsers);
// userRoutes.get("/searchUser", verifyToken, verifyRole1, searchUser);
// userRoutes.get("/users/:id", verifyToken, verifyRole1, getUserById);
// userRoutes.post("/tambahUser", addUser);
// userRoutes.delete("/hapusUser/:id", verifyToken, verifyRole1, deleteUser);
// userRoutes.put("/ubahRoleUser/:id", verifyToken, verifyRole1, ubahRoleUser);
// userRoutes.post("/req-reset-password", reqPasswordReset);

// userRoutes.use((req, res, next) => {
//   try {
//     req.link;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// });
userRoutes.post("/change-password/:id/:token", resetPassword);
// userRoutes.use("/", reqError);

module.exports = userRoutes;
