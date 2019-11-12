import {connect} from "react-redux";

import App from "./App";
import {reload} from "../../modules/users";

const mapStateToProps = state => ({});

const mapDispatchToProps = {reload};

export default connect(mapStateToProps, mapDispatchToProps)(App);
