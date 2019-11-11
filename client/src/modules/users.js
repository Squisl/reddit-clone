import fetchAPI from "../utilities/fetchAPI";

// Action types
const RECEIVE_SESSION = "RECEIVE_SESSION";

// Action creators
export const receiveSession = user => ({
  type: RECEIVE_SESSION,
  user,
});

export const register = data => async dispatch => {
  const response = await fetchAPI("/api/users/register", "POST", data);
  console.log("Register response", response);
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
