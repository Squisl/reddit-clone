import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {GoArrowUp, GoArrowDown} from "react-icons/go";
import {FaCommentAlt} from "react-icons/fa";

import styles from "./Post.module.css";

const Post = ({}) => {
  return (
    <div className={styles.post}>
      <div className={styles.post__sidebar}>
        <div className={styles.vote__box}>
          <GoArrowUp className={styles.vote__icon} />
          <span className={styles.vote__number}>100</span>
          <GoArrowDown className={styles.vote__icon} />
        </div>
      </div>
      <div className={styles.post__main}>
        <div className={styles.post__main__header}>
          <Link to="/" className={styles.post__community}>
            r/Askreddit
          </Link>
          <span className={styles.post__author}>
            Posted by{" "}
            <Link to="/" className={styles.post__user}>
              Doinb
            </Link>
          </span>
          <span className={styles.post__time}>7 hours ago</span>
        </div>
        <div className={styles.post__main__center}>
          <span className={styles.post__title}>
            People with expired non-disclosure-agreements, what's the juicy info you can
            now tell us?
          </span>
        </div>
        <div className={styles.post__main__footer}>
          <div className={styles.post__comment}>
            <FaCommentAlt />
            <span className={styles.post__comment__number}>12k comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
