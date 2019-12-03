import Head from 'next/head';
import { Component } from 'react';
import WithNavbar from "../components/WithNavbar";
import axios from 'axios';
import classNames from 'classnames';
import { Router } from 'next/router';


class Import extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            providerName: '',
            city: '',
            state: '',
            lat: '',
            lon: '',
            buttonDisabled: false,
            file: null,
            part: 1,
            columns: [],
            fileName: '',
            drgColumnIndex: -1,
            priceColumnIndex: -1
        };
    }
    componentDidMount() {
        this.fileInput.current.addEventListener('change', this.handleFile, false);
    }
    componentWillUnmount() {
        this.fileInput.current.removeEventListener('change', this.handleFile);
    }
    handleFormChange(e) {
        var newState = {}
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    handleFile = e => {
        if (e.target.files.length === 1) {
            this.setState({ buttonDisabled: true, file: e.target.files[0], fileName: e.target.files[0].name });
            var formData = new FormData();
            formData.append('sheet', e.target.files[0]);
            const reqOptions = {
                method: 'post',
                url: `${process.env.API_SERVER}/import/step/1`,
                data: formData,
                headers: {
                    'content-type': `multipart/form-data; boundary=${formData._boundary}`
                }
            };
            axios(reqOptions).then(res => {
                this.setState({ columns: res.data, part: this.state.part + 1 })
            })
        }
    }

    submitData() {
        this.setState({ part: this.state.part + 1 });
        var formData = new FormData();
        formData.append('sheet', this.state.file);
        formData.append('providerName', this.state.providerName);
        formData.append('city', this.state.city);
        formData.append('state', this.state.state);
        formData.append('lat', this.state.lat);
        formData.append('lon', this.state.lon);
        formData.append('drgIndex', this.state.drgColumnIndex);
        formData.append('priceIndex', this.state.priceColumnIndex);
        const reqOptions = {
            method: 'post',
            url: `${process.env.API_SERVER}/import/step/2`,
            data: formData,
            headers: {
                'content-type': `multipart/form-data; boundary=${formData._boundary}`
            }
        };
        axios(reqOptions).then(res => {
            if (res.status === 200) {
                this.setState({ part: this.state.part + 1 });
            } else {
                console.error('we failed.');
                Router.push('/');
            }

        })
    }

    render() {
        return (
            <WithNavbar>
                <Head>
                    <title key="title">Liform: Import Data</title>
                </Head>
                <section className="section has-background-light">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title is-2">Import Data</h1>
                                <h2 className="subtitle">Import DRG-price mappings for patients.</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <progress className="progress is-info" style={{borderRadius: 0}} max="5" value={this.state.part !== 4 ? this.state.part : null }></progress>
                <section className="section">
                    <div className={classNames("container", { "is-hidden": this.state.part !== 1 })}>
                        <h1 className="title has-text-centered">Step 1: The Basics</h1>
                        <h2 className="subtitle has-text-centered">Enter the name and location of your facility.</h2>
                        <div className="columns">
                            <div className="column is-2 is-hidden-mobile"></div>
                            <div className="column">
                                <div className="field is-grouped">
                                    <div className="control is-expanded">
                                        <input className="input" type="text" placeholder="Provider name" name="providerName" onChange={this.handleFormChange.bind(this)} value={this.state.providerName} required />
                                    </div>
                                    <div className="control is-expanded">
                                        <input className="input" type="text" placeholder="City" name="city" onChange={this.handleFormChange.bind(this)} value={this.state.city} required />
                                    </div>
                                    <div className="control">
                                        <div className="select">
                                            <select name="state" onChange={this.handleFormChange.bind(this)} value={this.state.state} required>
                                                <option>-</option>
                                                <option value="AL">AL</option>
                                                <option value="AK">AK</option>
                                                <option value="AR">AR</option>
                                                <option value="AZ">AZ</option>
                                                <option value="CA">CA</option>
                                                <option value="CO">CO</option>
                                                <option value="CT">CT</option>
                                                <option value="DC">DC</option>
                                                <option value="DE">DE</option>
                                                <option value="FL">FL</option>
                                                <option value="GA">GA</option>
                                                <option value="HI">HI</option>
                                                <option value="IA">IA</option>
                                                <option value="ID">ID</option>
                                                <option value="IL">IL</option>
                                                <option value="IN">IN</option>
                                                <option value="KS">KS</option>
                                                <option value="KY">KY</option>
                                                <option value="LA">LA</option>
                                                <option value="MA">MA</option>
                                                <option value="MD">MD</option>
                                                <option value="ME">ME</option>
                                                <option value="MI">MI</option>
                                                <option value="MN">MN</option>
                                                <option value="MO">MO</option>
                                                <option value="MS">MS</option>
                                                <option value="MT">MT</option>
                                                <option value="NC">NC</option>
                                                <option value="NE">NE</option>
                                                <option value="NH">NH</option>
                                                <option value="NJ">NJ</option>
                                                <option value="NM">NM</option>
                                                <option value="NV">NV</option>
                                                <option value="NY">NY</option>
                                                <option value="ND">ND</option>
                                                <option value="OH">OH</option>
                                                <option value="OK">OK</option>
                                                <option value="OR">OR</option>
                                                <option value="PA">PA</option>
                                                <option value="RI">RI</option>
                                                <option value="SC">SC</option>
                                                <option value="SD">SD</option>
                                                <option value="TN">TN</option>
                                                <option value="TX">TX</option>
                                                <option value="UT">UT</option>
                                                <option value="VT">VT</option>
                                                <option value="VA">VA</option>
                                                <option value="WA">WA</option>
                                                <option value="WI">WI</option>
                                                <option value="WV">WV</option>
                                                <option value="WY">WY</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control is-expanded">
                                        <input type="text" className="input" placeholder="latitude" name="lat" value={this.state.lat} onChange={this.handleFormChange.bind(this)} required />
                                    </div>
                                    <div className="control is-expanded">
                                        <input type="text" className="input" placeholder="longitude" name="lon" value={this.state.lon} onChange={this.handleFormChange.bind(this)} required />
                                    </div>
                                </div>
                                <button className="button is-info" onClick={() => this.setState({ part: this.state.part + 1 })}>Next &rarr;</button>
                            </div>
                            <div className="column is-2 is-hidden-mobile"></div>
                        </div>
                    </div>
                    <div className={classNames("container", { "is-hidden": this.state.part !== 2 })}>
                        <h1 className="title has-text-centered">Step 2: Upload Price Data</h1>
                        <h2 className="subtitle has-text-centered">Upload an Excel spreadsheet with DRGs and typical prices.</h2>
                        <details className="has-text-centered">
                            <summary style={{ outline: 'none', cursor: 'pointer', userSelect: 'none' }}><em><strong>What format does the spreadsheet have to be?</strong></em></summary>
                            <br />
                            <img src="/import-example.png" alt="import example" width="500px" />
                        </details>
                        <br />
                        <div className="file has-name is-centered is-info">
                            <label className="file-label">
                                <input className="file-input" type="file" accept=".xls,.xlsx" ref={this.fileInput} disabled={this.state.inputDisabled} />
                                <span className="file-cta">
                                    <span className="file-label">
                                        Pick a file to upload...
                                    </span>
                                </span>
                                <span className="file-name">
                                    {this.state.fileName}
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className={classNames("container", { "is-hidden": this.state.part !== 3 })}>
                        <h1 className="title has-text-centered">Step 3: Select Column Mappings</h1>
                        <h2 className="subtitle has-text-centered">Select which column contains the DRG, and which column contains the DRG cost.</h2>
                        <div className="columns">
                            <div className="column has-text-centered"><strong>Current DRG column:</strong><br />{this.state.drgColumnIndex === -1 ? <span>none</span> : <code>{this.state.columns[this.state.drgColumnIndex]}</code>} </div>
                            <div className="column has-text-centered"><strong>Current price column:</strong><br />{this.state.priceColumnIndex === -1 ? <span>none</span> : <code>{this.state.columns[this.state.priceColumnIndex]}</code>} </div>
                        </div>
                        <br /><br />
                        <div className="columns">
                            {this.state.columns.map((val, idx) =>
                                <div className={classNames("column", { 'is-hidden': this.state.drgColumnIndex === idx || this.state.priceColumnIndex === idx || (this.state.drgColumnIndex !== -1 && this.state.priceColumnIndex !== -1) })} key={idx}>
                                    <h2 className="subtitle"><code>{val}</code></h2>
                                    <br />
                                    <div className="buttons is-grouped">
                                        <button className={classNames('button', 'is-link', { 'is-hidden': this.state.drgColumnIndex !== -1 })} onClick={() => this.setState({ drgColumnIndex: idx })}>DRG Column</button>
                                        <button className={classNames('button', 'is-success', { 'is-hidden': this.state.priceColumnIndex !== -1 })} onClick={() => this.setState({ priceColumnIndex: idx })}>Price Column</button>
                                    </div>
                                    <hr />
                                </div>
                            )}
                        </div>
                        <br />
                        <div className="buttons is-grouped">
                            <button className="button is-danger" onClick={() => this.setState({ drgColumnIndex: -1, priceColumnIndex: -1 })}>Reset Mappings</button>
                            <button className={classNames("button", "is-primary", { 'is-hidden': this.state.drgColumnIndex === -1 || this.state.priceColumnIndex === -1 })} onClick={this.submitData.bind(this)}>Submit</button>
                        </div>
                    </div>
                    <div className={classNames("container", { "is-hidden": this.state.part !== 4 })}>
                        <h1 className="title has-text-centered">Uploading...</h1>
                        <h2 className="subtitle has-text-centered">We're uploading your data right now. Please don't close this tab.</h2>
                        <br />
                    </div>
                    <div className={classNames("container", { "is-hidden": this.state.part !== 5 })}>
                        <h1 className="title has-text-centered">Upload Complete</h1>
                        <h2 className="subtitle has-text-centered">Congrats! You're done.</h2>
                    </div>
                </section>
            </WithNavbar>
        );
    }
}


export default Import;