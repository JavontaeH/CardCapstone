import { getToken } from "./authManager";
const baseUrl = "/api/UserProfile";

export const getAllActiveUsers = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const getAllDeactivatedUsers = () => {
  return fetch(`${baseUrl}/GetDeactivated`).then((response) => response.json());
};

export const getAllPendingDemotionUsers = () => {
  return fetch(`${baseUrl}/GetPendingDemotions`).then((response) =>
    response.json()
  );
};

export const getUserProfileById = (num) => {
  return fetch(`${baseUrl}/Details/${num}`).then((response) => response.json());
};

export const getLoggedInUser = () => {
  return getToken().then((token) =>
    fetch(baseUrl + `/GetCurrentUserInfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json())
  );
};

export const updateProfile = (profile) => {
  return fetch(`${baseUrl}/Edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
};

export const updateDemotedProfile = (profile) => {
  return fetch(`${baseUrl}/EditDemoted`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
};

export const updateFullyDemotedProfile = (profile) => {
  return fetch(`${baseUrl}/EditFullDemotion`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
};
