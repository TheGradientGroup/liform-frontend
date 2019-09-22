import React, {Component} from "react"
import './Navbar.css'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: ''
        }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    }

    handleSearchTextChange(e) {
        this.setState({searchText: e.target.value}, () => {
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
  
    search(query){
        fetch("https://liform-backend.herokuapp.com/search", {
            method: 'GET',
            body: {
                query
            },
            headers: {
              "Content-Type": "application/json"
        }})
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(e => console.error(e))

    }

    render() {
        return(
            <div className="liform-navbar">
                <div className="container liform-nav-container">
                    <img src="logo.svg" className="liform-logo" />
                    <input 
                        type="text"
                        className="input liform-top-search"
                        value={this.state.searchText}
                        onChange={this.handleSearchTextChange}
                        placeholder="search for a treatment or DRG code"
                    />
                </div>
            </div>
        )
    }
}

export default Navbar