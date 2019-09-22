import React, { Component } from 'react'
import './UserSubmission.css'

const BASE_URL = 'https://liform-backend.herokuapp.com'

class UserSubmissionPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            drg: 0,
            cost: 0,
            hospitalID: '', // TODO: Perform lookup of hospital and get ID,
            hospitals: null
        }
        this.handleDrgChange = this.handleDrgChange.bind(this)
        this.handleCostChange = this.handleCostChange.bind(this)
        this.changeHospital = this.changeHospital.bind(this)
        this.uploadData = this.uploadData.bind(this)
    }

    componentDidMount() {
        fetch(`${BASE_URL}/hospitals`)
            .then(res => res.json())
            .then(json => {
                this.setState({ hospitals: json, hospitalID: json[0] })
            })
    }

    changeHospital(e) {
        this.setState({ hospitalID: e.target.value })
    }

    handleDrgChange(e) {
        this.setState({ drg: e.target.value })
    }

    handleCostChange(e) {
        this.setState({ cost: e.target.value })
    }

    uploadData() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                drg: this.state.drg,
                cost: this.state.cost,
                hospitalID: this.state.hospitalID
            })
        }
        fetch(`${BASE_URL}/admin/submissions/upload`, options)
            .catch(e => console.error(e))
            .then(response => response.json())
            .then(data => console.log(data))
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
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <section id="userSubmission">
                                <div className="title">Share your medical receipt data</div>
                                <div className="subtitle">Your data is anonymized and not associated with you.</div>
                                <div className="submission-box">
                                    <p><strong>DRG Code:</strong> <input className="input" type="number" max="999" value={this.state.drg} onChange={this.handleDrgChange} /></p>
                                    <br />
                                    <p><strong>Treatment cost (USD):</strong> <input className="input" type="number" value={this.state.cost} onChange={this.handleCostChange} /></p>
                                    <br />
                                    <p><strong>Hospital Name:</strong> <div className="select">{hospitalSelector}</div></p>
                                    <br />
                                    <button className="button is-primary" onClick={this.uploadData}>Complete Upload</button>
                                </div>
                            </section>
                        </div>
                        <div className="column is-hidden-mobile"></div>
                    </div>
                </div>
            </section>
        )
    }
}

export default UserSubmissionPage