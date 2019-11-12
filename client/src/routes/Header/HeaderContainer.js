import {connect} from "react-redux";

import Header from "./Header";
import {toggleRegister, toggleLogin} from "../../modules/modals";
import {logout} from "../../modules/users";

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
});

const mapDispatchToProps = {toggleRegister, toggleLogin, logout};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
