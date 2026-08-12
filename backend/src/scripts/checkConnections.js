require("dotenv").config();

const { driver } = require("../config/db");

async function run() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User {name:"Vishal"})
      -[:CONNECTED_TO]->
      (friend)

      RETURN friend.name AS friend
    `);

    console.log(
      result.records.map(r =>
        r.get("friend")
      )
    );
  } finally {
    await session.close();
    await driver.close();
  }
}

run();