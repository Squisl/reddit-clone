import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {GoArrowUp, GoArrowDown} from "react-icons/go";
import {FaCommentAlt} from "react-icons/fa";
import relativeTime from "../../utilities/relativeTime";
import styles from "./Post.module.css";
import totalVotes from "../../utilities/totalVotes";

const Post = ({
  id,
  community,
  user,
  text,
  title,
  time,
  votes,
  session,
  upvote,
  downvote,
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.post__sidebar}>
        <div className={styles.vote__box}>
          <GoArrowUp
            className={`${styles.vote__icon} ${styles.upvote} ${
              votes.some(v => v.user_id === session._id && v.vote === 1)
                ? styles.upvoted
                : ""
            }`}
            onClick={() => upvote(id)}
          />
          <span
            className={`${styles.vote__number} ${
              votes.some(v => v.user_id === session._id && v.vote === 1)
                ? styles.upvoted
                : ""
            } ${
              votes.some(v => v.user_id === session._id && v.vote === -1)
                ? styles.downvoted
                : ""
            }`}
          >
            {totalVotes(votes)}
          </span>
          <GoArrowDown
            className={`${styles.vote__icon} ${styles.downvote} ${
              votes.some(v => v.user_id === session._id && v.vote === -1)
                ? styles.downvoted
                : ""
            }`}
            onClick={() => downvote(id)}
          />
        </div>
      </div>
      <div className={styles.post__main}>
        <div className={styles.post__main__header}>
          <Link to="/" className={styles.post__community}>
            r/{community}
          </Link>
          <span className={styles.post__author}>
            Posted by{" "}
            <Link to="/" className={styles.post__user}>
              {user}
            </Link>
          </span>
          <span className={styles.post__time}>{relativeTime(time)}</span>
        </div>
        <div className={styles.post__main__center}>
          <span className={styles.post__title}>{title}</span>
          {text && <span className={styles.post__text}>{text}</span>}
        </div>
        <div className={styles.post__main__footer}>
          <div className={styles.post__comment}>
            <FaCommentAlt className={styles.comment__icon} />
            <span className={styles.post__comment__number}>12k comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  community: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  votes: PropTypes.array.isRequired,
};

export default Post;
