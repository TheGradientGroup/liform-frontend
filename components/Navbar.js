import Router from 'next/router';
import React, { Component } from 'react'
import axios from 'axios';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            suggs: [],
            oldSuggs: [],
            getSuggestion: true
        }
    }
    handleChange(e) {
        if (e.target.value.length > 0 && this.state.getSuggestion) {
            axios.get(`//localhost:5000/search/drgs/${e.target.value}`).then(res => this.setState({ oldSuggs: this.state.suggs, suggs: res.data }))
        }
        this.setState({ input: e.target.value, getSuggestion: false })
        setTimeout(() => this.setState({ getSuggestion: true }), 300)
    }
    keyPressed(event) {
        if (event.key === "Enter") {
            this.state.oldSuggs.forEach(itm => {
                if (itm['human_name'] === this.state.input) {
                    Router.push(`/treatment/${itm.drg}`)
                }
            })
            this.state.suggs.forEach(itm => {
                if (itm['human_name'] === this.state.input) {
                    Router.push(`/treatment/${itm.drg}`)
                }
            })
        }
    }
    render() {
        return (
            <div className="liform-navbar">
                <div className="container liform-nav-container">
                    <img src="/logo.svg" className="liform-logo" onClick={() => Router.push('/')} style={{ cursor: 'pointer' }} />
                    <input type="text" className="input liform-top-search" onChange={this.handleChange.bind(this)} onKeyPress={this.keyPressed.bind(this)} placeholder="search for a treatment or DRG code" value={this.state.input} list="suggs" />
                    <datalist id="suggs">
                        {this.state.suggs.map(itm => <option key={itm.drg} value={itm['human_name']}>{itm['human_name']}</option>)}
                    </datalist>
                </div>
                <style jsx>
                    {`
                        * {
                            font-family: Archivo, sans-serif;
                        }
                        .liform-navbar {
                            padding: 20px;
                            background: #7DFFCF;
                        }
                        
                        .liform-nav-container {
                            display: flex;
                            align-items: center;
                        }
                        
                        .liform-logo {
                            height: 2rem;
                        }
                        
                        .liform-top-search {
                            margin-left: 40px;
                            background: none;
                            border: none;
                            border-bottom: 2px solid #1800BD;
                            outline: none;
                            color: #1800BD;
                            box-shadow: none;
                            border-radius: 0;
                            font-weight: 600;
                            padding-bottom: 0;
                            font-size: 1.1rem;
                            letter-spacing: -0.02em;
                        }
                        
                        .liform-top-search::placeholder {
                            color: #1800BD;
                            opacity: 0.6;
                        }
                        
                        .liform-top-search:hover {
                            border-bottom: 2px solid #1800BD;
                        }
                        
                        .liform-top-search:focus, .liform-top-search:active  {
                            outline: none;
                            border-bottom: 2px solid #1800BD;
                            box-shadow: none;
                        }
                        
                        @media screen and (max-width: 500px) {
                            .liform-top-search {
                                margin-left: 20px;
                            }
                        }
                    `}
                </style>
            </div>
        )
    }
}

export default Navbar