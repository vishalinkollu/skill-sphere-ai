const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const graphRoutes = require("./routes/graphRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.use("/api/users", userRoutes);

app.use(
  "/api/recommendations",
  recommendationRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/graph",
  graphRoutes
);

module.exports = app;