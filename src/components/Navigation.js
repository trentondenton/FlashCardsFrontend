import React, { Component } from 'react';
import axios from 'axios';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    }
    this.handleSignout = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          this.props.handleSuccessfulLogout();
          this.props.history.push("/");
        }
        return res.data;
      })
      .catch(err => {
        console.log("SignOut", err)
      })
  }
  render() {
    return (
      <div className="navigation-container">
        <a href="/" className="nav-link">Home</a>
        <a href="/card" className="nav-link">Study</a>
        {this.props.loggedInStatus === 'LOGGED_IN' ?
          <a href="/" onClick={this.handleSignOut} to="/" className="nav-link">Logout</a>
          :
          <a href="/login" className="nav-link">Login</a>
        }
      </div>
    )
  }
}
