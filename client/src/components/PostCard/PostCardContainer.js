import {connect} from "react-redux";

import PostCard from "./PostCard";
import {upvote, downvote} from "../../modules/posts";

const mapStateToProps = state => ({
  session: state.users.session,
});

const mapDispatchToProps = {upvote, downvote};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
