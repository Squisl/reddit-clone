import {connect} from "react-redux";
import CommentForm from "./CommentForm";
import {toggleRegister, toggleLogin} from "../../modules/modals";

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {toggleRegister, toggleLogin};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
