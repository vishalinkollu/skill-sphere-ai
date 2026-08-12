require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER,
    process.env.COGNODB_PASSWORD
  )
);

const verifyConnection = async () => {
  try {
    await driver.verifyConnectivity();
    console.log("CognoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
  }
};

module.exports = {
  driver,
  verifyConnection
};