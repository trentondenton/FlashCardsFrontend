import React, { Component } from 'react';
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="page-container">
        <div className="stuff">
          <h1>Welcome!</h1>
          <p>To the devCamp Flash-Cards App!</p>
        </div>
      </div>
    )
  }
}