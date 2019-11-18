import fetchAPI from "../utilities/fetchAPI";

// Action type
const RECEIVE_POSTS = "RECEIVE_POSTS";
const RECEIVE_UPDATED_POST = "RECEIVE_UPDATED_POST";

// Action creators
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveUpdatedPost = updatedPost => ({
  type: RECEIVE_UPDATED_POST,
  updatedPost,
});

export const fetchPosts = () => async dispatch => {
  try {
    const fetchedPosts = await fetchAPI("/api/posts", "GET");
    dispatch(receivePosts(fetchedPosts));
  } catch (e) {
    console.error(e);
  }
};

export const fetchCommunityPosts = community_id => async dispatch => {
  try {
    const fetchedPosts = await fetchAPI(`/api/posts/community/${community_id}`, "GET");
    dispatch(receivePosts(fetchedPosts));
  } catch (e) {
    console.error(e);
  }
};

export const upvote = post_id => async dispatch => {
  try {
    const upvotedPost = await fetchAPI(`/api/posts/upvote/${post_id}`, "POST");
    dispatch(receiveUpdatedPost(upvotedPost));
  } catch (e) {
    console.error(e);
  }
};

export const downvote = post_id => async dispatch => {};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_UPDATED_POST:
      const stateCopy = [...state];
      const postIndex = stateCopy.findIndex(post => post._id === action.updatedPost._id);
      stateCopy[postIndex] = action.updatedPost;
      return stateCopy;
    default:
      return state;
  }
};
