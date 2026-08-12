const { driver } = require("../config/db");

const getDashboardStats = async () => {
  const session = driver.session();

  try {
    const users = await session.run(`
      MATCH (u:User)
      RETURN count(u) AS totalUsers
    `);

    const skills = await session.run(`
      MATCH (s:Skill)
      RETURN count(s) AS totalSkills
    `);

    const companies = await session.run(`
      MATCH (c:Company)
      RETURN count(c) AS totalCompanies
    `);

    const relationships =
      await session.run(`
        MATCH ()-[r]->()
        RETURN count(r) AS totalRelationships
      `);

    return {
      totalUsers:
        users.records[0]
          .get("totalUsers")
          .toNumber(),

      totalSkills:
        skills.records[0]
          .get("totalSkills")
          .toNumber(),

      totalCompanies:
        companies.records[0]
          .get("totalCompanies")
          .toNumber(),

      totalRelationships:
        relationships.records[0]
          .get("totalRelationships")
          .toNumber(),
    };
  } finally {
    await session.close();
  }
};

module.exports = {
  getDashboardStats,
};