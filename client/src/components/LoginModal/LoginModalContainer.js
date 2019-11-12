import {connect} from "react-redux";

import LoginModal from "./LoginModal";
import {toggleLogin} from "../../modules/modals";
import {login} from "../../modules/users";
import {receiveErrors, clearErrors, clearError} from "../../modules/errors";

const mapStateToProps = state => ({
  open: state.modals.login,
  errors: state.errors,
});

const mapDispatchToProps = {toggleLogin, login, receiveErrors, clearError, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
