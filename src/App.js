import React, { Component } from 'react';
import FlashCard from './components/FlashCard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <div className="App" >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FlashCard />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

}

