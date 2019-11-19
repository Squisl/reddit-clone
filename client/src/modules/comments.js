import fetchAPI from "../utilities/fetchAPI";

// Action types
const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";

// Action creators
const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
});

export const fetchPostComments = post_id => async dispatch => {
  try {
    const fetchedComments = await fetchAPI(`/api/comments/post/${post_id}`);
    dispatch(receivePostComments(fetchedComments));
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  post: [],
  user: [],
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        post: action.comments,
      };
    default:
      return state;
  }
};
