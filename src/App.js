import React, { Component } from 'react';
import FlashCards from './components/FlashCards';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <div className="App" >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FlashCards />} />
          </Routes>

        </BrowserRouter>
      </div>
    );
  }

}

