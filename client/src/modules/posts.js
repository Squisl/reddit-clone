import fetchAPI from "../utilities/fetchAPI";

// Action type
const RECEIVE_POSTS = "RECEIVE_POSTS";
const RECEIVE_UPDATED_POST = "RECEIVE_UPDATED_POST";
const RECEIVE_POST = "RECEIVE_POST";

// Action creators
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveUpdatedPost = updatedPost => ({
  type: RECEIVE_UPDATED_POST,
  updatedPost,
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const fetchPosts = () => async dispatch => {
  try {
    const fetchedPosts = await fetchAPI("/api/posts", "GET");
    dispatch(receivePosts(fetchedPosts));
  } catch (e) {
    console.error(e);
  }
};

export const fetchCommunityPosts = community_name => async dispatch => {
  try {
    const fetchedPosts = await fetchAPI(`/api/posts/community/${community_name}`, "GET");
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

export const downvote = post_id => async dispatch => {
  try {
    const downvotedPost = await fetchAPI(`/api/posts/downvote/${post_id}`, "POST");
    dispatch(receiveUpdatedPost(downvotedPost));
  } catch (e) {
    console.error(e);
  }
};

export const fetchPost = post_id => async dispatch => {
  try {
    const fetchedPost = await fetchAPI(`/api/posts/${post_id}`, "GET");
    dispatch(receivePost(fetchedPost));
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  all: [],
  current: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        all: action.posts,
      };
    case RECEIVE_UPDATED_POST:
      const allCopy = [...state.all];
      const postIndex = allCopy.findIndex(post => post._id === action.updatedPost._id);
      if (postIndex > -1) {
        allCopy[postIndex] = action.updatedPost;
      }
      if (state.current && state.current._id === action.updatedPost._id) {
        return {
          all: allCopy,
          current: action.updatedPost,
        };
      }
      return {
        ...state,
        all: allCopy,
      };
    case RECEIVE_POST:
      return {
        ...state,
        current: action.post,
      };
    default:
      return state;
  }
};
