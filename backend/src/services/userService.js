const { driver } = require("../config/db");

const getUsers = async () => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)
      RETURN u
    `);

    return result.records.map(
      (record) => record.get("u").properties
    );
  } finally {
    await session.close();
  }
};

const getUserById = async (userId) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {id:$userId})

      OPTIONAL MATCH (u)-[:HAS_SKILL]->(s:Skill)
      OPTIONAL MATCH (u)-[:WORKED_AT]->(c:Company)
      OPTIONAL MATCH (u)-[:CONNECTED_TO]->(f:User)

      RETURN
      u,
      collect(DISTINCT s) AS skills,
      collect(DISTINCT c) AS companies,
      collect(DISTINCT f) AS connections
      `,
      { userId }
    );

    if (!result.records.length) {
      return null;
    }

    const record = result.records[0];

    return {
      user: record.get("u").properties,

      skills: record
        .get("skills")
        .filter(Boolean)
        .map((skill) => skill.properties),

      companies: record
        .get("companies")
        .filter(Boolean)
        .map((company) => company.properties),

      connections: record
        .get("connections")
        .filter(Boolean)
        .map((connection) => connection.properties),
    };
  } finally {
    await session.close();
  }
};

const searchUsers = async (searchTerm) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)
      RETURN u
    `);

    const users = result.records.map(
      (record) => record.get("u").properties
    );

    return users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  } finally {
    await session.close();
  }
};

module.exports = {
  getUsers,
  getUserById,
  searchUsers,
};