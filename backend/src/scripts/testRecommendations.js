require("dotenv").config();

const { driver } = require("../config/db");

async function test() {
  const session = driver.session();

  try {
    const userId =
      "PASTE_VISHAL_ID_HERE";

    const result = await session.run(
      `
      MATCH (u:User {id:$userId})
      RETURN u
      `,
      { userId }
    );

    console.log(
      "Users found:",
      result.records.length
    );
  } catch (err) {
    console.log(err);
  } finally {
    await session.close();
    await driver.close();
  }
}

test();