import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
  render () {
    return (
      <div className="home">
        <div className="hero is-medium has-text-centered home-hero">
          <div className="hero-body">
          <h1 className="home-title">Share and compare medical bills.</h1>
          <h2 className="home-subtitle">Liform makes major medical procedures more affordable.</h2>
          </div>
        </div>
        <footer className="footer"></footer>
      </div>
    )
  }
}

export default Home
