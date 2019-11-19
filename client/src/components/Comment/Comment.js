import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Comment.module.css";
import {GoArrowUp, GoArrowDown} from "react-icons/go";
import {MdChatBubble} from "react-icons/md";
import relativeTime from "../../utilities/relativeTime";
import totalVotes from "../../utilities/totalVotes";

const Comment = ({user, text, time, votes}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__sidebar}>
        <div className={styles.comment__arrows}>
          <GoArrowUp className={`${styles.arrow__icon} ${styles.upvote}`} />
          <GoArrowDown className={`${styles.arrow__icon} ${styles.downvote}`} />
        </div>
      </div>
      <div className={styles.comment__main}>
        <div className={styles.comment__header}>
          <Link to="/" className={styles.comment__user}>
            {user}
          </Link>
          <span className={styles.comment__points}>{totalVotes(votes)} points</span>
          <span className={styles.comment__time}>{relativeTime(time)}</span>
        </div>
        <div className={styles.comment__text}>{text}</div>
        <div className={styles.comment__footer}>
          <div className={styles.comment__reply}>
            <MdChatBubble className={styles.reply__icon} />
            <span className={styles.reply__text}>Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
