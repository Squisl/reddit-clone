import React, {useEffect} from "react";
import PropTypes from "prop-types";

import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar";
import PostCard from "../../components/PostCard";

const Home = ({
  match,
  communities,
  fetchCommunities,
  fetchPosts,
  fetchCommunityPosts,
  posts,
  history,
}) => {
  useEffect(() => {
    fetchCommunities();
    if (match.params.community) {
      fetchCommunityPosts(match.params.community);
    } else {
      fetchPosts();
    }
  }, [fetchCommunities, fetchCommunityPosts, fetchPosts, match.params.community]);
  return (
    <div className={styles.home}>
      <Sidebar
        communities={communities.all}
        fetchCommunities={fetchCommunities}
        history={history}
      />
      <div className={styles.home__post__list}>
        {posts.all.map(post => (
          <PostCard
            key={post._id}
            id={post._id}
            community={post.community.name}
            user={post.user.name}
            title={post.title}
            text={post.text}
            time={post.createdAt}
            votes={post.votes}
            comments={post.comments}
            history={history}
          />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
