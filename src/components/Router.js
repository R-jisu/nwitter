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
      {props.isLooggedIn && <Navigation userObj={props.userObj} />}
      <Switch>
        {props.isLooggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={props.userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile
                refreshUser={props.refreshUser}
                userObj={props.userObj}
              />
            </Route>
            <Redirect path="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect path="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
