const { driver } = require("../config/db");

const getDashboardStats = async (req, res) => {
  const session = driver.session();

  try {
    const usersResult = await session.run(`
      MATCH (u:User)
      RETURN count(u) as totalUsers
    `);

    const skillsResult = await session.run(`
      MATCH (s:Skill)
      RETURN count(s) as totalSkills
    `);

    const companiesResult = await session.run(`
      MATCH (c:Company)
      RETURN count(c) as totalCompanies
    `);

    const connectionsResult = await session.run(`
      MATCH ()-[r:CONNECTED_TO]->()
      RETURN count(r) as totalConnections
    `);

    res.status(200).json({
      success: true,
      data: {
        totalUsers:
          usersResult.records[0]
            .get("totalUsers")
            .toNumber(),

        totalSkills:
          skillsResult.records[0]
            .get("totalSkills")
            .toNumber(),

        totalCompanies:
          companiesResult.records[0]
            .get("totalCompanies")
            .toNumber(),

        totalConnections:
          connectionsResult.records[0]
            .get("totalConnections")
            .toNumber(),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard stats",
    });
  } finally {
    await session.close();
  }
};

module.exports = {
  getDashboardStats,
};