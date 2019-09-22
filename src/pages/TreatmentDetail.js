import React, { Component } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts'
import './TreatmentDetail.css'

const drgMappings = require('../util/drgmappings.js')

const BASE_URL = 'https://liform-backend.herokuapp.com'

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

class Result extends Component {

    render() {
        return (
            <div className="box">
                <div className="hospital-desc">
                    <div className="columns">
                        <div className="column has-text-left">
                            <strong>{this.props.hospital.name}</strong>
                            <p><em>{this.props.hospital.location}</em></p>
                        </div>
                        <div className="column has-text-right">{formatCurrency(this.props.hospital.price)}</div>
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
            selectedHospitalId: '',
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

    componentDidMount() {
        const drg = this.props.match.params.id
        const description = drg in drgMappings ? drgMappings[drg] : 'Uknown treatment'
        fetch(`${BASE_URL}/procedures/${drg}`)
            .then(res => res.json())
            .then(obj => {
                this.setState({
                    averageCost: obj.avg,
                    treatmentName: description
                })
                return fetch(`${BASE_URL}/procedures/${drg}/${this.state.selectedHospitalId}`)
                    .then(res => res.json())
                    .then(obj => {
                        this.setState({
                            averageCost: obj, // It's stored differently in database
                            treatmentName: description
                        })
                    })
            })
    }

    render() {
        var hospitalSelector = null
        if (Array.isArray(this.state.hospitals) && this.state.hospitals.length > 0) {
            var hospitalOptions = this.state.hospitals.map((val, idx) => {
                return <option key={idx} value={val._id}>{val.name}</option>
            })
            hospitalSelector = (
                <select className="input" onChange={this.changeHospital}>
                    {hospitalOptions}
                </select>
            )
        }
        return (
            <>
                <section className="section treatment-hero">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title">{this.state.treatmentName}</h1>
                            </div>
                            <div className="column is-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '1.3rem' }}>
                                Average cost: {formatCurrency(this.state.averageCost)}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="treatmentResults" className="section">
                    <div className="container">
                        <h4 className="title is-4 has-text-centered">Hospitals Near You</h4>
                        <div className="columns">
                            <div className="column graph-column">
                                <BarChart width={730} height={250} data={this.state.results}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    {
                                        this.state.results.map((result) => {
                                            return <Bar />
                                        })
                                        // TODO: Fill smallest bar with different color
                                    }
                                </BarChart>
                            </div>
                            <div className="column">
                                <p><strong>Hospital Name:</strong> <div className="select">{hospitalSelector}</div></p>
                                <ResultsList results={this.state.results} />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="submitBillCta">
                    <div className="has-text-centered"><em>Did you get this procedure? Help others out and <a href="#">share your medical bill here &rarr;</a></em></div>
                </section>
            </>
        )
    }
}

export default TreatmentDetail