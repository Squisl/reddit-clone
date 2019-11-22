import {connect} from "react-redux";
import ReplyEditor from "./ReplyEditor";
import {replyToComment} from "../../modules/comments";

const mapStateToProps = state => ({});

const mapDispatchToProps = {replyToComment};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyEditor);
