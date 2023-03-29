import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = (props) => {
  return (
    <Router>
      {props.isLooggedIn && <Navigation />}
      <Switch>
        {props.isLooggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={props.userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
