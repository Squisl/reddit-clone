import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";
import Input from "../Input";
import SidebarCommunity from "../SidebarCommunity";

const Sidebar = ({communities, fetchCommunities, history}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCommunities(search);
  }, [fetchCommunities, search]);

  return (
    <div className={styles.sidebar}>
      <Input value={search} onChange={e => setSearch(e.target.value)} />
      <div className={styles.sidebar__community__list}>
        {communities.map(community => (
          <SidebarCommunity
            key={community._id}
            label={community.name}
            history={history}
          />
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  communities: PropTypes.array.isRequired,
};

export default Sidebar;
