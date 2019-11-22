import fetchAPI from "../utilities/fetchAPI";

// Action types
const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";
const RECEIVE_UPDATED_COMMENT = "RECEIVE_UPDATED_COMMENT";
const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";

// Action creators
const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
});

const receiveUpdatedComment = comment => ({
  type: RECEIVE_UPDATED_COMMENT,
  comment,
});

const receiveNewComment = comment => ({
  type: RECEIVE_NEW_COMMENT,
  comment,
});

export const createComment = (post_id, text) => async dispatch => {
  try {
    const createdComment = await fetchAPI("/api/comments", "POST", {post_id, text});
    dispatch(receiveNewComment(createdComment));
  } catch (e) {
    console.error(e);
  }
};

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
    dispatch(receiveUpdatedComment(updatedComment));
  } catch (e) {
    console.error(e);
  }
};

export const downvote = comment_id => async dispatch => {
  try {
    const updatedComment = await fetchAPI(`/api/comments/downvote/${comment_id}`, "POST");
    dispatch(receiveUpdatedComment(updatedComment));
  } catch (e) {
    console.error(e);
  }
};

export const replyToComment = (comment_id, post_id, text) => async dispatch => {
  try {
    const reply = await fetchAPI(`/api/comments/reply/${comment_id}`, "POST", {
      post_id,
      text,
    });
    console.log("Reply", reply);
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
    case RECEIVE_UPDATED_COMMENT:
      return {
        ...state,
        post: state.post.map(comment =>
          comment._id === action.comment._id ? action.comment : comment
        ),
      };
    case RECEIVE_NEW_COMMENT:
      return {
        ...state,
        post: state.post.concat(action.comment),
      };
    default:
      return state;
  }
};
