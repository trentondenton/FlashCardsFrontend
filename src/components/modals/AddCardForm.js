import React, { Component } from 'react'

export default class AddCardForm extends Component {
  constructor() {
    super();
    this.state = {
      front: '',
      back: '',
      cards: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let data = {
      front: `${this.state.front}`,
      back: `${this.state.back}`
    }
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    fetch("http://localhost:5000/card", fetchData)

    this.setState({
      currentCards: this.state.currentCards + 1
    })
    window.location.reload();
  }
  render() {
    return (
      <div className="page-container">
        <div className="form-container">
          <h2> DevCamp FlashCards</h2>
          <form onSubmit={this.handleSubmit}>

            <div className="input-container">
              <input
                type="text"
                name="front"
                value={this.state.front}
                placeholder='Front of Card'
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="back"
                value={this.state.back}
                placeholder='Back of Card'
                onChange={this.handleChange}
              />
            </div>
            <button className="form-btn" type="submit">Add Card</button>
          </form>
        </div>
      </div>
    )
  }
}