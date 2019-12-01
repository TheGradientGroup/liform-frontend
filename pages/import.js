import Head from 'next/head';
import { Component } from 'react';
import WithNavbar from "../components/WithNavbar";


class Import extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            buttonDisabled: false
        };
    }
    componentDidMount() { 
        this.fileInput.current.addEventListener('change', this.handleFile, false);
    }
    componentWillUnmount() { 
        this.fileInput.current.removeEventListener('change', this.handleFile);
    }
    handleFile = e => {
        if (e.target.files.length === 1) { 
            var formData = new FormData();
            data.append('sheet', e.target.files[0])
        }
        this.setState({ buttonDisabled: true });
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
                <section className="section">
                    <div className="container">
                        <h1 className="title has-text-centered">Step 1: The Basics</h1>
                        <h2 className="subtitle has-text-centered">Enter the name and location of your facility.</h2>
                        <div className="columns">
                            <div className="column is-2 is-hidden-mobile"></div>
                            <div className="column">
                                <div className="field is-grouped">
                                    <div className="control is-expanded">
                                        <input className="input" type="text" placeholder="Provider name" />
                                    </div>
                                    <div className="control is-expanded">
                                        <input className="input" type="text" placeholder="City" />
                                    </div>
                                    <div className="control">
                                        <div className="select">
                                            <select>
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
                                        <input type="text" className="input" placeholder="latitude" />
                                    </div>
                                    <div className="control is-expanded">
                                        <input type="text" className="input" placeholder="longitude" />
                                    </div>
                                </div>
                            </div>
                            <div className="column is-2 is-hidden-mobile"></div>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="container">
                        <h1 className="title has-text-centered">Step 2: Upload Price Data</h1>
                        <h2 className="subtitle has-text-centered">Upload an Excel spreadsheet with DRGs and typical prices.</h2>
                        <details className="has-text-centered">
                            <summary style={{ outline: 'none', cursor: 'pointer', userSelect: 'none' }}><em><strong>What format does the spreadsheet have to be?</strong></em></summary>
                            <br />
                            <img src="/import-example.png" alt="import example" width="500px" />
                        </details>
                        <br />
                        <div className="file is-centered is-info">
                            <label className="file-label">
                                <input className="file-input" type="file" accept=".xls,.xlsx" ref={this.fileInput} disabled={this.state.inputDisabled} />
                                <span className="file-cta">
                                    <span className="file-label">
                                        Pick a file to upload...
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </section>
            </WithNavbar>
        );
    }
}


export default Import;