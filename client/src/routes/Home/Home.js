import React from "react";
import PropTypes from "prop-types";

import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar";
import Post from "../../components/Post/Post";

const Home = props => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.home__post__list}>
        <Post />
        <Post />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
