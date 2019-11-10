import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";
import Input from "../Input";
import SidebarCommunity from "../SidebarCommunity";

const Sidebar = props => {
  return (
    <div className={styles.sidebar}>
      <Input />
      <div className={styles.sidebar__community__list}>
        <SidebarCommunity label="Jokes" />
        <SidebarCommunity label="Relationship" />
        <SidebarCommunity label="Anime" />
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
