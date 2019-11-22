import {connect} from "react-redux";
import CommentForm from "./CommentForm";
import {toggleRegister, toggleLogin} from "../../modules/modals";
import {createComment} from "../../modules/comments";

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {toggleRegister, toggleLogin, createComment};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
