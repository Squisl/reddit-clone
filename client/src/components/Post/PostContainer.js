import {connect} from "react-redux";

import Post from "./Post";
import {upvote, downvote} from "../../modules/posts";

const mapStateToProps = state => ({
  session: state.users.session,
});

const mapDispatchToProps = {upvote, downvote};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
