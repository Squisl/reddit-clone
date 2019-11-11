import {connect} from "react-redux";

import RegisterModal from "./RegisterModal";
import {toggleRegister} from "../../modules/modals";

const mapStateToProps = state => ({
  open: state.modals.register,
});

const mapDispatchToProps = {toggleRegister};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
