import {connect} from "react-redux";

import RegisterModal from "./RegisterModal";
import {toggleRegister} from "../../modules/modals";
import {register} from "../../modules/users";

const mapStateToProps = state => ({
  open: state.modals.register,
});

const mapDispatchToProps = {toggleRegister, register};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
