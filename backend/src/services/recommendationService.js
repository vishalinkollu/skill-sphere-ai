const { driver } = require("../config/db");

const getConnectionRecommendations =
  async (userId) => {
    const session = driver.session();

    try {
      const result =
        await session.run(
          `
          MATCH (u:User {id:$userId})
          -[:CONNECTED_TO]->
          (friend)
          -[:CONNECTED_TO]->
          (recommended)

          WHERE recommended <> u

          RETURN DISTINCT recommended
          `,
          { userId }
        );

      return result.records.map(
        (record) =>
          record.get("recommended")
            .properties
      );
    } finally {
      await session.close();
    }
  };

const getSkillRecommendations =
  async (userId) => {
    const session = driver.session();

    try {
      const result =
        await session.run(
          `
          MATCH (u:User {id:$userId})
          -[:HAS_SKILL]->
          (skill)

          -[:RELATED_TO]->
          (recommended)

          RETURN DISTINCT recommended
          `,
          { userId }
        );

      return result.records.map(
        (record) =>
          record.get("recommended")
            .properties
      );
    } finally {
      await session.close();
    }
  };

const getCompanyRecommendations =
  async (userId) => {
    const session = driver.session();

    try {
      const result =
        await session.run(
          `
          MATCH (u:User {id:$userId})
          -[:HAS_SKILL]->
          (skill)

          <-[:LOOKING_FOR]-
          (company)

          RETURN DISTINCT company
          `,
          { userId }
        );

      return result.records.map(
        (record) =>
          record.get("company")
            .properties
      );
    } finally {
      await session.close();
    }
  };

module.exports = {
  getConnectionRecommendations,
  getSkillRecommendations,
  getCompanyRecommendations,
};