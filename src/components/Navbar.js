import React from "react"
import {Link} from "react-router-dom"

function Navbar() {
    return(
        <div>
            <nav className="navbar">
                <Link className="compare-costs" to="../pages/Home.js">
                    Compare Costs
                </Link>
                <Link className="compare-costs" to="../pages/Home.js">
                    Share Your Bill
                </Link>
                <div className="field">
                  <div className="control">
                    <input className="input" type="text" placeholder="Search for a treatment"/>
                  </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
