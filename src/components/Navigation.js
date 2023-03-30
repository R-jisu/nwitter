import React from "react";
import { Link } from "react-router-dom";

function Navigation({ userObj }) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName ?? "User"}의 Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
