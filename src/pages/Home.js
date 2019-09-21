import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
  render () {
    return (
      <div className="home">
        <div className="hero home-hero">
          <h1 className="home-title">Share and compare medical bills.</h1>
          <h2 className="home-subtitle">Make major medical procedures more affordable.</h2>
        </div>
        <footer className="footer"></footer>
      </div>
    )
  }
}

export default Home
