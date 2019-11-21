import fetchAPI from "../utilities/fetchAPI";

// Action types
const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";
const RECEIVE_COMMENT = "RECEIVE_COMMENT";

// Action creators
const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
});

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const fetchPostComments = post_id => async dispatch => {
  try {
    const fetchedComments = await fetchAPI(`/api/comments/post/${post_id}`);
    dispatch(receivePostComments(fetchedComments));
  } catch (e) {
    console.error(e);
  }
};

export const upvote = comment_id => async dispatch => {
  try {
    const updatedComment = await fetchAPI(`/api/comments/upvote/${comment_id}`, "POST");
    dispatch(receiveComment(updatedComment));
  } catch (e) {
    console.error(e);
  }
};

export const downvote = comment_id => async dispatch => {
  try {
    const updatedComment = await fetchAPI(`/api/comments/downvote/${comment_id}`, "POST");
    dispatch(receiveComment(updatedComment));
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
    case RECEIVE_COMMENT:
      return {
        ...state,
        post: state.post.map(comment =>
          comment._id === action.comment._id ? action.comment : comment
        ),
      };
    default:
      return state;
  }
};
