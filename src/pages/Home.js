import React, { Component } from 'react'

class Home extends Component {
  render () {
    return (
      <div>
        <div className="hero">
          <div className="hero-body has-text-centered">
            <h1 className="title">Share and compare medical bills.</h1>
            <h2 className="subtitle">Make major medical procedures more affordable.</h2>
          </div>
        </div>

        <div className="container">
          <div class="field has-addons" style={{justifyContent: 'center'}}>
            <div class="control">
              <input class="input" type="text" placeholder="Enter a MS-DRG Code"/>
            </div>
            <div class="control">
              <a class="button is-info">
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
