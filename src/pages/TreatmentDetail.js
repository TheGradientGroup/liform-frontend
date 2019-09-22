import React, { Component } from 'react'
import './TreatmentDetail.css'

class Result extends Component {

    /**
     * @param {Number} amount The price to convert into United States dollars.
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    render() {
        return (
            <div className="box">
                <div className="hospital-desc">
                    <div className="columns">
                        <div className="column has-text-left">
                            <strong>{this.props.hospital.name}</strong>
                            <p><em>{this.props.hospital.location}</em></p>
                        </div>
                        <div className="column has-text-right">{this.formatCurrency(this.props.hospital.price)}</div>
                    </div>
                </div>
            </div>
        )
    }
}

class ResultsList extends Component {
    render() {
        const items = this.props.results.map(result => <Result hospital={result} />)
        return (
            <div className="treatment-list">
                {items}
            </div>
        )
    }
}

class TreatmentDetail extends Component {

    constructor() {
        super();
        this.state = {
            treatmentName: 'Cartoid Artery Stent Procedure',
            averageCost: 0,
            results: [
                {
                    name: 'X Hospital',
                    location: 'Richardson',
                    price: 150000
                },
                {
                    name: 'Y Hospital',
                    location: 'Coppell, TX',
                    price: 99000
                }
            ]
        }
    }

    calculuateAverageCost(results) {
        return results => results.reduce((a, b) => a.price + b, 0) / results.length
    }

    fetchResults(query) {
        // TODO
    }

    render() {
        return (
            <>
                <section className="section treatment-hero">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title">{this.state.treatmentName}</h1>
                            </div>
                            <div className="column is-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '1.3rem' }}>
                                Average cost: {this.calculuateAverageCost(this.state.results)}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h4 className="title is-4 has-text-centered">Hospitals Near You</h4>
                        <ResultsList results={this.state.results} />
                        <div className="has-text-centered"><em>Did you get this procedure? Help others out and <a href="#">share your medical bill here &rarr;</a></em></div>
                    </div>
                </section>
            </>
        )
    }
}

export default TreatmentDetail