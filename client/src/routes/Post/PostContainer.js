import {connect} from "react-redux";
import Post from "./Post";
import {fetchPost} from "../../modules/posts";
import {fetchPostComments} from "../../modules/comments";

const mapStateToProps = state => ({
  post: state.posts.current,
  session: state.users.session,
  comments: state.comments.post,
});

const mapDispatchToProps = {fetchPost, fetchPostComments};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
