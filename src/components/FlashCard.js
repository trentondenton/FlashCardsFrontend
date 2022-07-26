import React, { Component } from 'react';
import axios from 'axios';

export default class FlashCard extends Component {
  constructor() {
    super();
    this.state = {
      front: '',
      back: '',
      cards: [],
      isFlipped: false,
      redirect: false,
      selectedCardId: 1,
      currentCards: 6,
    }

    this.getCard = this.getCard.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.previousCard = this.previousCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCard() {
    axios.get(`http://localhost:5000/card/${this.state.selectedCardId}`)
      .then(response => {
        this.setState({
          cards: response.data
        });
      })
      .catch(error => {
        console.log('GCardsE', error);
      });
  }

  flipCard(card) {
    this.setState({
      isFlipped: !this.state.isFlipped
    })
  }

  componentDidMount() {
    this.getCard();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  nextCard() {
    if (this.state.selectedCardId < this.state.currentCards) {
      this.setState({
        selectedCardId: this.state.selectedCardId + 1
      })
    }
    else {
      alert('This is the last card');
    }
    this.getCard();
  }

  previousCard() {
    if (this.state.selectedCardId > 1) {
      this.setState({
        selectedCardId: this.state.selectedCardId - 1
      })
    } else {
      alert('This is the first card');
    }
    this.getCard();
  }

  render() {
    return (
      <div className="page-container">
        <div className="cards-container">
          <div className={`card ${!this.state.isFlipped ? 'front' : 'back'}`}>{this.state.isFlipped === false ? this.state.cards.front : <div className='is-flipped'>{this.state.cards.back}</div>}
          </div>
          <div className="button-container">
            <button className="flip-btn" onClick={this.previousCard}>Previous</button>
            <button className="flip-btn" onClick={this.flipCard}>Flip Card</button>
            <button className="flip-btn" onClick={this.nextCard}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}
