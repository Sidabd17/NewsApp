import './App.css';

import React, { Component } from 'react'
import NavBar from './components/navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<News key="/" country="us" category="general" pageSize={6} />} />
          <Route path="/business" element={<News key="business" country="us" category="business" pageSize={6} />} />
          <Route path="/entertainment" element={<News key="entertainment" country="us" category="entertainment" pageSize={6} />} />
          <Route path="/general" element={<News key="general" country="us" category="general" pageSize={6} />} />
          <Route path="/health" element={<News key="health" country="us" category="health" pageSize={6} />} />
          <Route path="/science" element={<News key="science" country="us" category="science" pageSize={6} />} />
          <Route path="/sports" element={<News key="sports" country="us" category="sports" pageSize={6} />} />
          <Route path="/technology" element={<News key="technology" country="us" category="technology" pageSize={6} />} />
        </Routes>
        </Router>
      </div>
    )
  }
}

