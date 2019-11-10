import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch></Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
