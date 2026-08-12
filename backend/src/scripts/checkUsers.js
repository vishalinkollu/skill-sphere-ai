require("dotenv").config();

const { driver } = require("../config/db");

const check = async () => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)
      RETURN u
    `);

    result.records.forEach((record) => {
      console.log(
        record.get("u").properties
      );
    });
  } finally {
    await session.close();
    await driver.close();
  }
};

check();