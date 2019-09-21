import React, { Component } from 'react'

class TreatmentDetail extends Component {
    render() {
        return (
            <>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title">Cartoid Artery Stent Procedure</h1>
                            </div>
                            <div className="column is-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '1.3rem' }}>
                                Average cost: $109,003
                           </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h4 className="title is-4 has-text-centered">Hospitals Near You</h4>
                        <div className="columns">
                            <div className="column">
                                MAP
                                <br/>
                                <img src="https://via.placeholder.com/300"/>
                            </div>
                            <div className="column">
                                <input type="text" className="input" placeholder="search for a hospital..." />
                                <br />
                                <br/>
                                <div className="box">
                                    <div className="hospital-desc">
                                        <div className="columns">
                                            <div className="column has-text-left">
                                                <strong>X Hospital</strong>
                                                <p><em>Richardson, TX</em></p>
                                            </div>
                                            <div className="column has-text-right">$150,000</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="hospital-desc">
                                        <div className="columns">
                                            <div className="column has-text-left">
                                                <strong>Y Hospital</strong>
                                                <p><em>Coppell, TX</em></p>
                                            </div>
                                            <div className="column has-text-right">$99,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="has-text-centered"><em>Did you get this procedure? Help others out and <a href="#">share your medical bill here &rarr;</a></em></div>
                    </div>
                </section>
            </>
        )
    }
}

export default TreatmentDetail