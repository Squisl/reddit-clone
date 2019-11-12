import {connect} from "react-redux";

import RegisterModal from "./RegisterModal";
import {toggleRegister} from "../../modules/modals";
import {register} from "../../modules/users";
import {receiveErrors, clearError, clearErrors} from "../../modules/errors";

const mapStateToProps = state => ({
  open: state.modals.register,
  errors: state.errors,
});

const mapDispatchToProps = {
  toggleRegister,
  register,
  receiveErrors,
  clearError,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
