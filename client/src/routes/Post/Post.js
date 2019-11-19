import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./Post.module.css";
import PostContent from "../../components/PostContent";
import Loading from "../../components/Loading";
import Comment from "../../components/Comment";

const Post = ({
  match,
  fetchPost,
  post,
  fetchPostComments,
  session,
  upvote,
  downvote,
  comments,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch post and it's comments by id
    if (match.params.post_id) {
      fetchPost(match.params.post_id);
      fetchPostComments(match.params.post_id);
    }
  }, [fetchPost, fetchPostComments, match.params.post_id]);

  useEffect(() => {
    if (post && comments.length) {
      setLoading(false);
    }
  }, [post, comments]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.post__container}>
      <div className={styles.post__content}>
        <PostContent
          id={post._id}
          votes={post.votes}
          session={session}
          upvote={upvote}
          downvote={downvote}
          community={post.community.name}
          user={post.user.name}
          time={post.createdAt}
          title={post.title}
          text={post.text}
          comments={post.comments}
        />
        <div className={styles.comments__container}>
          {comments.map(comment => (
            <Comment
              user={comment.user.name}
              text={comment.text}
              time={comment.createdAt}
              votes={comment.votes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
