import API from "./api";

export const getConnectionRecommendations = (
  userId
) => {
  return API.get(
    `/recommendations/connections/${userId}`
  );
};

export const getSkillRecommendations = (
  userId
) => {
  return API.get(
    `/recommendations/skills/${userId}`
  );
};

export const getCompanyRecommendations = (
  userId
) => {
  return API.get(
    `/recommendations/companies/${userId}`
  );
};