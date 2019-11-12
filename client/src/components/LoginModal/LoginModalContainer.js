import {connect} from "react-redux";

import LoginModal from "./LoginModal";
import {toggleLogin} from "../../modules/modals";
import {login} from "../../modules/users";

const mapStateToProps = state => ({
  open: state.modals.login,
});

const mapDispatchToProps = {toggleLogin, login};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
