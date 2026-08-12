const express = require("express");

const {
  fetchGraph,
} = require(
  "../controllers/graphController"
);

const router =
  express.Router();

router.get(
  "/",
  fetchGraph
);

module.exports = router;