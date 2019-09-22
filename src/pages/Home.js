import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <>
        <div className="home">
          <div className="hero is-medium has-text-centered home-hero">
            <div className="hero-body">
              <h1 className="home-title">Share and compare medical bills.</h1>
              <h2 className="home-subtitle">Liform makes major medical procedures more affordable.</h2>
            </div>
          </div>
          <section className="section">
            <h1 className="title is-2 has-text-centered liform-desc">How Liform Works</h1>
            <div className="liform-steps has-text-centered">
              <div className="liform-step">1. Search for the medical procedure you’re looking to receive</div>
              <div className="liform-step">2. We’ll show you how much the procedure might cost at hospitals nearby</div>
              <div className="liform-step">3. <Link to="/submit">Share</Link> your medical bills to help others</div>
            </div>
          </section>
          <footer className="footer">
            <div className="container has-text-centered">
              &copy; 2019 Liform Labs.
            <br />
              <Link to="/import">Import data &rarr;</Link>
            </div>
          </footer>
        </div>
      </>
    )
  }
}

export default Home
