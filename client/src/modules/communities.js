import fetchAPI from "../utilities/fetchAPI";

// Action types
const RECEIVE_COMMUNITIES = "RECEIVE_COMMUNITIES";

// Action creators
export const receiveCommunities = communities => ({
  type: RECEIVE_COMMUNITIES,
  communities,
});

export const fetchCommunities = () => async dispatch => {
  try {
    const fetchedCommunities = await fetchAPI("/api/communities", "GET");
    dispatch(receiveCommunities(fetchedCommunities));
  } catch (e) {
    console.error(e);
  }
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMUNITIES:
      return action.communities;
    default:
      return state;
  }
};
