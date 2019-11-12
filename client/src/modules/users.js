import fetchAPI from "../utilities/fetchAPI";
import {toggleRegister, toggleLogin} from "./modals";
import {receiveErrors} from "./errors";

// Action types
const RECEIVE_SESSION = "RECEIVE_SESSION";

// Action creators
export const receiveSession = user => ({
  type: RECEIVE_SESSION,
  user,
});

export const register = data => async dispatch => {
  try {
    await fetchAPI("/api/users/register", "POST", data);
    dispatch(toggleRegister());
  } catch (e) {
    console.error(e);
    dispatch(receiveErrors(e));
  }
};

export const login = data => async dispatch => {
  try {
    const response = await fetchAPI("/api/users/login", "POST", data);
    localStorage.setItem("token", response.token);
    dispatch(receiveSession(response.user));
    dispatch(toggleLogin());
  } catch (e) {
    console.error(e);
    dispatch(receiveErrors(e));
  }
};

const initialState = {
  session: null,
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
    default:
      return state;
  }
};
