import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Navbar.css'
import drgs from '../util/drgs'
import Fuse from 'fuse.js'

const drgSearch = new Fuse(drgs, {keys: ['drg', 'desc']})

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            searchSuggestions: [
            ],
            displaySuggestions: false
        }
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
        this.processSuggestion = this.processSuggestion.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    processSuggestion(e) {
        console.log(e)
        // this.setState({ searchText: this.state.searchSuggestions[idx].desc || '' })
        console.log('hey')
    }

    handleSearchTextChange(e) {
        var suggestions = drgSearch.search(e.target.value)
        suggestions = suggestions.length > 3 ? suggestions.slice(0, 3) : suggestions
        this.setState({ searchText: e.target.value, displaySuggestions: true, searchSuggestions: suggestions }, () => {
            console.log(this.state)
        })
    }

    handleInputChange() { 
        if (this.state.searchSuggestions.length === 0 ||!this.state.searchSuggestions[0]) { return }
        this.props.history.push(`/treatment/${this.state.searchSuggestions[0].drg}`)
    }

    render() {
        var searchSugg = null
        if (this.state.displaySuggestions) {
            var sugArr = this.state.searchSuggestions.map(({ drg, desc }) => {
                return <option key={drg} value={desc} />
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
                        list="data"
                        type="text"
                        className="input liform-top-search"
                        value={this.state.searchText}
                        onChange={this.handleSearchTextChange}
                        onFocus={() => this.setState({ displaySuggestions: true })}
                        onBlur={() => this.setState({ displaySuggestions: false })}
                        onInput={this.handleInputChange}
                        placeholder="search for a treatment or DRG code"
                    />
                    {searchSugg}
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar)