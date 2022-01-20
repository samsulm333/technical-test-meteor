const express = require("express");

const router = express.Router();

// jwt token middleware
const { auth } = require("../../middlewares/auth");

// permission access middleware
const { accessAuth } = require("../../middlewares/permission");

const { register, login } = require("../controllers/auth");
const {
  getUserById,
  createUser,
  updateUserByAdmin,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require("../controllers/user");

// Router

// Register & Login
router.post("/register", register);
router.post("/login", login);

// admin route
router.post("/user", auth, accessAuth, createUser);
router.get("/user/:id", auth, accessAuth, getUserById);
router.patch("/user/:id", auth, accessAuth, updateUserByAdmin);
router.delete("/user/:id", auth, accessAuth, deleteUser);

// change password route
router.patch("/password", auth, accessAuth, changePassword);

// user route
router.patch("/my-profile", auth, accessAuth, updateUserProfile);
router.get("/my-profile", auth, accessAuth, getUserProfile);

module.exports = router;
