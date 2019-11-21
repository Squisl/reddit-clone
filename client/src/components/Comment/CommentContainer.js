import {connect} from "react-redux";
import Comment from "./Comment";
import {upvote, downvote} from "../../modules/comments";

const mapStateToProps = state => ({
  session: state.users.session,
});

const mapDispatchToProps = {upvote, downvote};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
