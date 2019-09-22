import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Navbar.css'
import algoliasearch from 'algoliasearch/lite';
import { connectAutoComplete } from 'react-instantsearch-dom';

const searchClient = algoliasearch('ZL91PC3JWP', 'a50b8e6f848607e36fe279be76682f06');
const index = searchClient.initIndex('drgs')

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

    search(query) {
        index.search({
            query,
            attributesToRetrieve: ['desc', 'drg']
        })
            .then(hits => {
                this.setState({ searchSuggestions: hits })
                console.log(hits)
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        var searchSugg = null
        if (this.state.displaySuggestions) {
            var sugArr = this.state.searchSuggestions.map(({ drg, desc }) => {
                return <option key={drg} value={desc} onClick={() => { this.props.history.push(`/procedures/${drg}`) }} />
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
                        className="input liform-top-search"
                        value={this.state.searchText}
                        onChange={this.handleSearchTextChange}
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

export default connectAutoComplete(withRouter(Navbar))