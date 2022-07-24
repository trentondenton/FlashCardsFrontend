import React, { Component } from 'react';
import axios from 'axios';

export default class FlashCards extends Component {
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

    this.getAllCards = this.getAllCards.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  getAllCards() {
    axios.get('http://localhost:5000/cards')
      .then(response => {
        this.setState({
          cards: response.data
        });
        console.log('State Cards', this.state.cards)
      })
      .catch(error => {
        console.log('GCardsE', error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.reload();
  }

  flipCard(card) {
    this.setState({
      isFlipped: !this.state.isFlipped
    })
  }

  componentDidMount() {
    this.getAllCards();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="page-container">
        <div className="cards-container">
          {this.state.cards.map((item) => {
            return <div key={item.id} className={`card ${!this.state.isFlipped ? 'front' : 'back'}`}>{!this.state.isFlipped ? item.front : <div className='is-flipped'>{item.back}</div>}</div>
          })}
          <div className="button-container">
            <button className="float-btn" onClick={this.flipCard}>Flip Cards</button>
          </div>
        </div>
      </div >
    )
  }
}
