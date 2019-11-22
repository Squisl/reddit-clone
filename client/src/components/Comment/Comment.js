import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import dompurify from "dompurify";
import styles from "./Comment.module.css";
import {GoArrowUp, GoArrowDown} from "react-icons/go";
import {MdChatBubble} from "react-icons/md";
import relativeTime from "../../utilities/relativeTime";
import totalVotes from "../../utilities/totalVotes";
import ReplyEditor from "../ReplyEditor";

const Comment = ({id, post_id, user, text, time, votes, upvote, downvote, session}) => {
  const [replyOpen, setReplyOpen] = useState(false);

  const toggleReply = () => setReplyOpen(!replyOpen);

  const sanitizer = dompurify.sanitize;
  return (
    <div className={styles.comment}>
      <div className={styles.comment__sidebar}>
        <div className={styles.comment__arrows}>
          <GoArrowUp
            className={`${styles.arrow__icon} ${styles.upvote} ${votes.some(
              v => v.user_id === session._id && v.vote === 1
            ) && styles.upvoted}`}
            onClick={() => upvote(id)}
          />
          <GoArrowDown
            className={`${styles.arrow__icon} ${styles.downvote} ${votes.some(
              v => v.user_id === session._id && v.vote === -1
            ) && styles.downvoted}`}
            onClick={() => downvote(id)}
          />
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
        <div
          className={styles.comment__text}
          dangerouslySetInnerHTML={{__html: sanitizer(text)}}
        ></div>
        <div className={styles.comment__footer}>
          <div className={styles.comment__reply} onClick={toggleReply}>
            <MdChatBubble className={styles.reply__icon} />
            <span className={styles.reply__text}>Reply</span>
          </div>
        </div>
        {replyOpen && (
          <ReplyEditor comment_id={id} post_id={post_id} toggle={toggleReply} />
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
