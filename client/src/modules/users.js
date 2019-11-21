import fetchAPI from "../utilities/fetchAPI";
import {toggleRegister, toggleLogin} from "./modals";
import {receiveErrors} from "./errors";

// Action types
const RECEIVE_SESSION = "RECEIVE_SESSION";
const LOGOUT_SESSION = "LOGOUT_SESSION";

// Action creators
export const receiveSession = user => ({
  type: RECEIVE_SESSION,
  user,
});

export const logoutSession = () => ({
  type: LOGOUT_SESSION,
});

export const register = (data, handleReset) => async dispatch => {
  try {
    await fetchAPI("/api/users/register", "POST", data);
    dispatch(toggleRegister());
    handleReset();
  } catch (e) {
    console.error(e);
    dispatch(receiveErrors(e));
  }
};

export const login = (data, handleReset) => async dispatch => {
  try {
    const response = await fetchAPI("/api/users/login", "POST", data);
    localStorage.setItem("token", response.token);
    dispatch(receiveSession(response.user));
    dispatch(toggleLogin());
    handleReset();
  } catch (e) {
    console.error(e);
    dispatch(receiveErrors(e));
  }
};

export const logout = () => async dispatch => {
  // Remove access token from the local storage
  localStorage.removeItem("token");
  // Delete the cookie containing the refresh token
  try {
    await fetchAPI("/api/users/logout", "GET");
  } catch (e) {
    console.error(e);
  }
  dispatch(logoutSession());
};

export const reload = setLoading => async dispatch => {
  try {
    const response = await fetchAPI("/api/users/reload", "GET");
    dispatch(receiveSession(response));
    setLoading(false);
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  session: {},
  authenticated: false,
};
// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SESSION:
      return {
        ...state,
        session: action.user,
        authenticated: Object.keys(action.user).length > 0,
      };
    case LOGOUT_SESSION:
      window.location.href = "/";
      return initialState;
    default:
      return state;
  }
};
