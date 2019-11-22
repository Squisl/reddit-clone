import jwt_decode from "jwt-decode";

import fetchAPI from "../utilities/fetchAPI";

const refreshToken = () => next => async action => {
  const token = localStorage.getItem("token");
  if (!token) {
    return next(action);
  }
  try {
    const decoded = await jwt_decode(token);
    if (!decoded) {
      return next(action);
    }
    if (decoded.exp < Date.now() / 1000) {
      const response = await fetchAPI("/api/users/refresh_token", "GET");
      localStorage.setItem("token", response.token);
    }
    next(action);
  } catch (e) {
    console.error(e);
    next(action);
  }
};

export default refreshToken;
