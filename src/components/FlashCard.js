import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

export default class FlashCard extends Component {
  constructor() {
    super();
    this.state = {
      front: ' ',
      back: ' ',
      cards: [],
      isFlipped: false,
      selectedCardId: 1,
      currentCards: 0,
      addModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false
    }

    this.getCard = this.getCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.addCardClick = this.addCardClick.bind(this);
    this.editCardClick = this.editCardClick.bind(this);
    this.deleteCardClick = this.deleteCardClick.bind(this);
    this.previousCard = this.previousCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCardLength = this.getCardLength.bind(this);
  }

  handleEditSubmit(event) {
    event.preventDefault();
    let data = {
      front: this.state.front,
      back: this.state.back
    }

    let fetchData = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }
    fetch(`http://localhost:5000/card/${this.state.selectedCardId}`, fetchData)
    this.setState({
      editModalOpen: !this.state.editModalOpen
    })
  }

  editCardClick() {
    this.setState({
      editModalOpen: !this.state.editModalOpen
    })
  }

  deleteCardClick() {
    this.setState({
      deleteModalOpen: !this.state.deleteModalOpen
    })
  }

  handleDeleteSubmit(event) {
    event.preventDefault();
    axios.delete(`http://localhost:5000/card/${this.state.selectedCardId}`)
      .then(response => {
        alert(response)
        this.setState({
          deleteModalOpen: !this.state.deleteModalOpen
        })
      })
      .catch(error => {
        console.error('DC-', error)
      })
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
      addModalOpen: !this.state.addModalOpen
    })
  }

  getCard() {
    axios.get(`http://localhost:5000/card/${this.state.selectedCardId}`)
      .then(response => {
        this.setState({
          cards: response.data
        });

      })
      .catch(error => {
        console.error('GC', error);
      });
  }

  addCardClick() {
    this.setState({
      addModalOpen: !this.state.addModalOpen
    })
  }

  getCardLength() {
    axios.get(`http://localhost:5000/cards`)
      .then(response => {
        this.setState({
          currentCards: response.data.length
        });
      })
      .catch(error => {
        console.error('GCL', error);
      });
  }

  flipCard(card) {
    this.setState({
      isFlipped: !this.state.isFlipped
    })
  }

  componentDidMount() {
    this.getCard();
    this.getCardLength();
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
            <button className="flip-btn" onClick={this.previousCard}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <button className="flip-btn" onClick={this.flipCard}>Flip Card</button>
            <button className="flip-btn" onClick={this.nextCard}><FontAwesomeIcon icon={faAngleRight} /></button>
          </div>
          <div className="settings-container">
            {/* Add A Card */}
            <button className="add-btn" onClick={this.addCardClick}><FontAwesomeIcon icon={faPlus} /></button>
            <Modal
              isOpen={this.state.addModalOpen}
              bodyOpenClassName="modal"
              overlayClassName="modal-overlay"
              ariaHideApp={false}
            >
              <div className="add-card-modal">
                <h2>Add Card</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>Front</label>
                  <textarea type="text" className="front" name="front" onChange={this.handleChange} />

                  <label>Back</label>
                  <textarea type="text" className="back" name="back" onChange={this.handleChange} />

                  <button type="submit">Add Card</button>
                  <button className="cancel-btn" onClick={this.addCardClick}>Cancel</button>
                </form>
              </div>
            </Modal>

            {/* Edit A Card */}
            <button className="edit-btn" onClick={this.editCardClick}><FontAwesomeIcon icon={faPenToSquare} /></button>
            <Modal
              isOpen={this.state.editModalOpen}
              bodyOpenClassName="modal"
              overlayClassName="modal-overlay"
              ariaHideApp={false}
            >
              <div className="edit-card-modal">
                <form onSubmit={this.handleEditSubmit}>
                  <h2>Edit Card</h2>
                  <p>Card ID: {this.state.selectedCardId}</p>
                  <label>Front</label>
                  <textarea type="text" className="front" name="front" onChange={this.handleChange} placeHolder={this.state.cards.front} />

                  <label>Back</label>
                  <textarea type="text" className="back" name="back" onChange={this.handleChange} placeHolder={this.state.cards.back} />

                  <button type="submit">Edit</button>
                  <button className="cancel-btn" onClick={this.editCardClick}>Cancel</button>
                </form>
              </div>

            </Modal>

            {/* Delete A Card */}
            <button className="delete-btn" onClick={this.deleteCardClick}><FontAwesomeIcon icon={faTrash} /></button>
            <Modal
              isOpen={this.state.deleteModalOpen}
              bodyOpenClassName="modal"
              overlayClassName="modal-overlay"
              ariaHideApp={false}
            >
              <div className="delete-card-modal">
                <h2>Are you sure you want to delete the card?</h2>
                <div className="delete-card-modal-buttons">
                  <button className="delete-btn" type="button" onClick={this.handleDeleteSubmit}>Delete It!</button>
                  <button className="cancel-btn" type="button" onClick={this.deleteCardClick}>Oops, No.</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}
