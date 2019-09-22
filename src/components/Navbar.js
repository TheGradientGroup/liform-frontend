import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { callbackify } from "util"
import algoliasearch from 'algoliasearch/lite';
import { connectAutoComplete } from 'react-instantsearch-dom';

const searchClient = algoliasearch('ZL91PC3JWP', 'a50b8e6f848607e36fe279be76682f06');

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            searchSuggestions: [
                { "drg": "001", "desc": "Cancer of the code" }
            ],
            displaySuggestions: false
        }
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
        this.processSuggestion = this.processSuggestion.bind(this)
    }

    processSuggestion(e) {
        console.log(e)
        // this.setState({ searchText: this.state.searchSuggestions[idx].desc || '' })
        console.log('hey')
    }

    handleSearchTextChange(e) {
        this.setState({ searchText: e.target.value, displaySuggestions: true }, () => {
            console.log(this.state)
        })
    }

    // onKeyDown = (e) => {
    //     console.log(e.key)
    //     // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    //     if (event.key === 'Enter') {
    //       // event.preventDefault();
    //       // event.stopPropagation();
    //       this.search(this.state.searchText);
    //     }
    // }

    search(query) {
        fetch("https://liform-backend.herokuapp.com/search", {
            method: 'GET',
            body: {
                query
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(e => console.error(e))

    }

    render() {
        var searchSugg = null
        if (this.state.displaySuggestions) {
            var sugArr = this.state.searchSuggestions.map((val, idx) => {
                return <option key={idx} value={val.desc} />
            })
            searchSugg = (
                <datalist id="data">
                    {sugArr}
                </datalist>
            )
        }
        return (
            <div className="liform-navbar">
                <div className="container liform-nav-container">
                    <img src="/logo.svg" className="liform-logo" />
                    <input
                        type="search"
                        value={this.props.currentRefinement}
                        onChange={event => this.props.refine(event.currentTarget.value)}
                        className="input liform-top-search"
                        // value={this.state.searchText}
                        // onChange={this.handleSearchTextChange}
                        onFocus={() => this.setState({ displaySuggestions: true })}
                        onBlur={() => this.setState({ displaySuggestions: false })}
                        placeholder="search for a treatment or DRG code"
                    />
                    {searchSugg}
                </div>
            </div>
        )
    }
}

export default connectAutoComplete(Navbar)