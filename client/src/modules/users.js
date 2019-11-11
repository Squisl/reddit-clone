// Action types
const RECEIVE_SESSION = "RECEIVE_SESSION";

// Action creators
export const receiveSession = user => ({
  type: RECEIVE_SESSION,
  user,
});

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
