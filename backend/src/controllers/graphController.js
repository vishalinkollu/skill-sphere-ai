const {
  getGraphData,
} = require(
  "../services/graphService"
);

const fetchGraph =
  async (req, res) => {
    try {
      const graph =
        await getGraphData();

      res.status(200).json({
        success: true,
        data: graph,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };

module.exports = {
  fetchGraph,
};