import fetchAPI from "../utilities/fetchAPI";

// Action types
const RECEIVE_COMMUNITIES = "RECEIVE_COMMUNITIES";
const RECEIVE_COMMUNITY = "RECEIVE_COMMUNITY";

// Action creators
export const receiveCommunities = communities => ({
  type: RECEIVE_COMMUNITIES,
  communities,
});

export const receiveCommunity = community => ({
  type: RECEIVE_COMMUNITY,
  community,
});

export const fetchCommunities = (communityName = "") => async dispatch => {
  try {
    const fetchedCommunities = await fetchAPI(`/api/communities/${communityName}`, "GET");
    dispatch(receiveCommunities(fetchedCommunities));
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
    case RECEIVE_COMMUNITIES:
      return {
        ...state,
        all: action.communities,
      };
    case RECEIVE_COMMUNITY:
      return {
        ...state,
        current: action.community,
      };
    default:
      return state;
  }
};
