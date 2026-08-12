const express = require("express");

const {
  getConnections,
  getSkills,
  getCompanies,
} = require("../controllers/recommendationController");

const router = express.Router();

router.get(
  "/connections/:id",
  getConnections
);

router.get(
  "/skills/:id",
  getSkills
);

router.get(
  "/companies/:id",
  getCompanies
);

module.exports = router;