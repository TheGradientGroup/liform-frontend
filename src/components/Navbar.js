import React from "react"
import { Link } from "react-router-dom"
import './Navbar.css'

function Navbar() {
    return (
        <div className="liform-navbar">
            <div className="container liform-nav-container">
                <img src="logo.svg" className="liform-logo" />
                <input type="text" className="input liform-top-search" placeholder="search for a treatment or DRG code" />
            </div>
        </div>
    )
}

export default Navbar
