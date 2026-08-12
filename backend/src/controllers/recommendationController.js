const {
  getConnectionRecommendations,
  getSkillRecommendations,
  getCompanyRecommendations,
} = require(
  "../services/recommendationService"
);

const getConnections =
  async (req, res) => {
    try {
      const data =
        await getConnectionRecommendations(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };

const getSkills =
  async (req, res) => {
    try {
      const data =
        await getSkillRecommendations(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };

const getCompanies =
  async (req, res) => {
    try {
      const data =
        await getCompanyRecommendations(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };

module.exports = {
  getConnections,
  getSkills,
  getCompanies,
};