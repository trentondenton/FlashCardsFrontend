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

    this.getCard = this.getCard.bind(this);
    // this.getAllCards = this.getAllCards.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.previousCard = this.previousCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCard() {
    axios.get(`http://localhost:5000/card/${this.state.selectedCardId}`)
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

  // getAllCards() {
  //   axios.get('http://localhost:5000/cards')
  //     .then(response => {
  //       this.setState({
  //         cards: response.data
  //       });
  //       console.log('State Cards', this.state.cards)
  //     })
  //     .catch(error => {
  //       console.log('GCardsE', error);
  //     });
  // }

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
          <div className="remove-container">
          </div>
        </div>

        <div className="cards-container">
          <>

            <div className={`card ${!this.state.isFlipped ? 'front' : 'back'}`}>{this.state.isFlipped === false ? this.state.cards.front : <div className='is-flipped'>{this.state.cards.back}</div>}</div>

          </>
          <div className="button-container">
            <button className="flip-btn" onClick={this.previousCard}>Previous</button>
            <button className="flip-btn" onClick={this.flipCard}>Flip Card</button>
            <button className="flip-btn" onClick={this.nextCard}>Next</button>
          </div>

          {/* To Get All Cards 
          {this.state.cards.map((item) => {
            return <>
              {this.state.isFlipped === false ?
                <div className="card" id={item.id}>{item.front}</div>
                :
                <div className="card">{item.back}</div>
              }
              <div className="button-container">
                <button className="flip-btn" onClick={this.flipCard}>Flip Card</button>
              </div>
            </>
          })} */}
        </div>
      </div >
    )
  }
}
