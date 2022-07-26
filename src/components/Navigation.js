import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const NavigationComponent = props => {
  const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };

  return (
    <div className="navigation-container">
      <a href="/">
        Home
      </a>

      <a href="/card">
        Study
      </a>

      {props.loggedInStatus === "LOGGED_IN" ? (
        <a onClick={handleSignOut}> Logout</a>
      ) : <a href="/login" className="nav-link">Login</a>}
    </div>
  );
};

export default withRouter(NavigationComponent);