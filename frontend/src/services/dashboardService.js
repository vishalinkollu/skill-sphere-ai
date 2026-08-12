import API from "./api";

export const getDashboardStats = () => {
  return API.get("/dashboard/stats");
};

export const getDashboardGraph = () => {
  return API.get("/dashboard/graph");
};