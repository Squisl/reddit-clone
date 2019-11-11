import {connect} from "react-redux";

import LoginModal from "./LoginModal";
import {toggleLogin} from "../../modules/modals";

const mapStateToProps = state => ({
  open: state.modals.login,
});

const mapDispatchToProps = {toggleLogin};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
