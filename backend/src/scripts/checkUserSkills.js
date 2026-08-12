require("dotenv").config();

const { driver } = require("../config/db");

async function run() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User {name:"Vishal"})-[:HAS_SKILL]->(s:Skill)
      RETURN u.name AS user, s.name AS skill
    `);

    console.log(result.records.map(r => ({
      user: r.get("user"),
      skill: r.get("skill")
    })));
  } finally {
    await session.close();
    await driver.close();
  }
}

run();