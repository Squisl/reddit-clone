// Action types
const RECEIVE_ERRORS = "RECEIVE_ERRORS";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const CLEAR_ERROR = "CLEAR_ERROR";

// Action creators
export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const clearError = field => ({
  type: CLEAR_ERROR,
  field,
});

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return {
        ...state,
        ...action.errors,
      };
    case CLEAR_ERRORS:
      return {};
    case CLEAR_ERROR:
      const stateCopy = Object.assign({}, state);
      delete stateCopy[action.field];
      return stateCopy;
    default:
      return state;
  }
};
