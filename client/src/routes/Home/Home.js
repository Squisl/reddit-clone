import React, {useEffect} from "react";
import PropTypes from "prop-types";

import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar";
import Post from "../../components/Post";

const Home = ({
  match,
  communities,
  fetchCommunities,
  fetchPosts,
  fetchCommunityPosts,
  posts,
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
      <Sidebar communities={communities.all} fetchCommunities={fetchCommunities} />
      <div className={styles.home__post__list}>
        {posts.map(post => (
          <Post
            key={post._id}
            id={post._id}
            community={post.community.name}
            user={post.user.name}
            title={post.title}
            text={post.text}
            time={post.createdAt}
            votes={post.votes}
          />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
