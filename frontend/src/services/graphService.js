import API from "./api";

export const getGraphData =
  () => {
    return API.get(
      "/graph"
    );
  };