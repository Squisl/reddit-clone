import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import styles from "./App.module.css";
import Home from "../../routes/Home";
import Header from "../../routes/Header";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
