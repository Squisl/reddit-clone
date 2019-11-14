import {connect} from "react-redux";

import Home from "./Home";
import {fetchCommunities} from "../../modules/communities";

const mapStateToProps = state => ({
  communities: state.communities,
});

const mapDispatchToProps = {fetchCommunities};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
