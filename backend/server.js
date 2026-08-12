require("dotenv").config();

const app = require("./src/app");

const {
  verifyConnection
} = require("./src/config/db");

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
  await verifyConnection();

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
};

startServer();