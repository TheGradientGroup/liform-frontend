import React, { Component } from 'react'
import './UserSubmission.css'

const BASE_URL = 'https://liform-backend.herokuapp.com'

export default class UserSubmissionPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            drg: 0,
            cost: 0,
            hospitalName: '' // TODO: Perform lookup of hospital and get ID
        }
        this.handleDrgChange = this.handleDrgChange.bind(this)
        this.handleCostChange = this.handleCostChange.bind(this)
        this.handleHospitalNameChange = this.handleHospitalNameChange.bind(this)
    }

    handleDrgChange(e) {
        this.setState({ drg: e.target.value })
    }

    handleCostChange(e) {
        this.setState({ cost: e.target.value })
    }

    handleHospitalNameChange(e) {
        this.setState({ hospitalName: e.target.value })
    }

    uploadData() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                drg: this.state.drg,
                cost: this.state.cost,
                hospitalName: this.state.hospitalName
            }
        }
        fetch(`${BASE_URL}/admin/submissions/upload`, options)
            .catch(e => console.error(e))
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <>
                <section id="userSubmission">
                    <div className="title">Share your medical recipt data</div>
                    <div className="subtitle">Your data is anonymized and not associated with you.</div>
                    <div className="submission-box">
                        <p><strong>DRG Code:</strong> <input type="number" max="999" value={this.state.drg} onChange={this.handleDrgChange} /></p>
                        <p><strong>Treatment cost:</strong> $<input type="number" value={this.state.cost} onChange={this.handleCostChange} /></p>
                        <p><strong>Hospital Name:</strong> <input type="text" value={this.state.hospitalName} onChange={this.handleHospitalNameChange} /></p>
                        <button className="button is-primary" onClick={this.uploadData}>Complete Upload</button>
                    </div>
                </section>
            </>
        )
    }
}