import React, {useEffect} from "react";
import PropTypes from "prop-types";

import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar";
import Post from "../../components/Post/Post";

const Home = ({communities, fetchCommunities}) => {
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return (
    <div className={styles.home}>
      <Sidebar communities={communities} />
      <div className={styles.home__post__list}>
        <Post />
        <Post />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
