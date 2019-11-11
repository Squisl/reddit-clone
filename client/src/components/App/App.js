import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import styles from "./App.module.css";
import Home from "../../routes/Home";
import Header from "../../routes/Header";
import RegisterModal from "../RegisterModal";
import LoginModal from "../LoginModal";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <RegisterModal />
        <LoginModal />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
