const express = require("express");

const {
  getAllUsers,
  getSingleUser,
  searchUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/search", searchUser);

router.get("/:id", getSingleUser);

module.exports = router;