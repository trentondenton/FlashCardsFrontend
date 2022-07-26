import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth();
          window.location.reload("/");
        } else {
          this.setState({
            errorText: "Wrong email or password"
          });
          this.props.handleUnsuccessfulAuth();
        }
      })
      .catch(error => {
        this.setState({
          errorText: "An error occurred"
        });
        this.props.handleUnsuccessfulAuth();
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="form-container">
        <div className="form-card">
          <h2>Login</h2>
          <div>{this.state.errorText}</div>

          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button href="/" className="submit-btn" type="submit">Login</button>

          </form>
        </div>
      </div>
    );
  }
}