import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import dompurify from "dompurify";
import styles from "./Comment.module.css";
import {FaPlusCircle} from "react-icons/fa";
import {GoArrowUp, GoArrowDown} from "react-icons/go";
import {MdChatBubble} from "react-icons/md";
import relativeTime from "../../utilities/relativeTime";
import totalVotes from "../../utilities/totalVotes";
import ReplyEditor from "../ReplyEditor";

const Comment = ({
  id,
  post_id,
  user,
  text,
  time,
  votes,
  upvote,
  downvote,
  session,
  replies,
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleReply = () => setReplyOpen(!replyOpen);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const sanitizer = dompurify.sanitize;

  const nestedComments = (replies || []).map(comment => (
    <Comment
      key={comment._id}
      id={comment._id}
      post_id={comment.post.name}
      user={comment.user.name}
      text={comment.text}
      time={comment.createdAt}
      votes={comment.votes}
    />
  ));

  return (
    <div className={styles.comment}>
      <div className={styles.comment__sidebar}>
        {collapsed ? (
          <FaPlusCircle className={styles.collapse__icon} onClick={toggleCollapsed} />
        ) : (
          <>
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
            <div className={styles.collapse__line__container} onClick={toggleCollapsed}>
              <div className={styles.collapse__line} />
            </div>
          </>
        )}
      </div>
      <div className={styles.comment__main}>
        <div className={styles.comment__header}>
          <Link to="/" className={styles.comment__user}>
            {user}
          </Link>
          <span className={styles.comment__points}>{totalVotes(votes)} points</span>
          <span className={styles.comment__time}>{relativeTime(time)}</span>
        </div>
        {!collapsed && (
          <>
            <div
              className={styles.comment__text}
              dangerouslySetInnerHTML={{__html: sanitizer(text)}}
            />
            <div className={styles.comment__footer}>
              <div className={styles.comment__reply} onClick={toggleReply}>
                <MdChatBubble className={styles.reply__icon} />
                <span className={styles.reply__text}>Reply</span>
              </div>
            </div>
            {replyOpen && (
              <ReplyEditor comment_id={id} post_id={post_id} toggle={toggleReply} />
            )}
            {nestedComments}
          </>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
