import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import styles from "./App.module.css";
import Home from "../../routes/Home";
import Header from "../../routes/Header";
import RegisterModal from "../RegisterModal";
import LoginModal from "../LoginModal";
import Loading from "../Loading";

const App = ({reload}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      reload(setLoading);
    } else {
      setLoading(false);
    }
  }, [reload]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <RegisterModal />
        <LoginModal />
        <Switch>
          <Route exact path={["/", "/r/:community"]} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
