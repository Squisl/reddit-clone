import fetchAPI from "../utilities/fetchAPI";

// Action type
const RECEIVE_POSTS = "RECEIVE_POSTS";

// Action creators
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
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

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    default:
      return state;
  }
};
