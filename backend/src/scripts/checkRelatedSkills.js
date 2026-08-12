require("dotenv").config();

const { driver } = require("../config/db");

async function run() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (s:Skill)-[:RELATED_TO]->(r:Skill)
      RETURN s.name,r.name
    `);

    result.records.forEach(record => {
      console.log(
        record.get("s.name"),
        "->",
        record.get("r.name")
      );
    });
  } finally {
    await session.close();
    await driver.close();
  }
}

run();