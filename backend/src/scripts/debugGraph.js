require("dotenv").config();

const { driver } = require("../config/db");

async function debugGraph() {
  const session = driver.session();

  try {
    console.log("\n===== USERS =====");

    const users = await session.run(`
      MATCH (u:User)
      RETURN count(u) as total
    `);

    console.log(
      "Total Users:",
      users.records[0].get("total").toNumber()
    );

    console.log("\n===== SKILLS =====");

    const skills = await session.run(`
      MATCH (s:Skill)
      RETURN count(s) as total
    `);

    console.log(
      "Total Skills:",
      skills.records[0].get("total").toNumber()
    );

    console.log("\n===== COMPANIES =====");

    const companies = await session.run(`
      MATCH (c:Company)
      RETURN count(c) as total
    `);

    console.log(
      "Total Companies:",
      companies.records[0].get("total").toNumber()
    );

    console.log("\n===== RELATIONSHIPS =====");

    const relationships =
      await session.run(`
        MATCH ()-[r]->()
        RETURN count(r) as total
      `);

    console.log(
      "Total Relationships:",
      relationships.records[0]
        .get("total")
        .toNumber()
    );

    console.log(
      "\n===== USER CONNECTIONS ====="
    );

    const connections =
      await session.run(`
        MATCH (u:User)-[:CONNECTED_TO]->(f:User)
        RETURN u.name as from,
               f.name as to
      `);

    connections.records.forEach(
      (record) => {
        console.log(
          `${record.get("from")} -> ${record.get("to")}`
        );
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
    await driver.close();
  }
}

debugGraph();