import {connect} from "react-redux";

import Home from "./Home";
import {fetchCommunities} from "../../modules/communities";
import {fetchPosts, fetchCommunityPosts} from "../../modules/posts";

const mapStateToProps = state => ({
  communities: state.communities,
  posts: state.posts,
});

const mapDispatchToProps = {fetchCommunities, fetchPosts, fetchCommunityPosts};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
