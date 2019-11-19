import {connect} from "react-redux";
import Post from "./Post";
import {fetchPost, upvote, downvote} from "../../modules/posts";
import {fetchPostComments} from "../../modules/comments";

const mapStateToProps = state => ({
  post: state.posts.current,
  session: state.users.session,
  comments: state.comments.post,
});

const mapDispatchToProps = {fetchPost, fetchPostComments, upvote, downvote};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
