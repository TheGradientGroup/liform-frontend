import React, { Component } from 'react'
import XLSX from 'xlsx'
import drgProcessor from '../util/drgProcessor'

class Importer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wbk: null,
            csv: null,
            colChoices: [],
            drgCol: '',
            costCol: '',
            name: '',
            url: '',
            location: '',
            requestSuccess: null
        }
        this.handleFile = this.handleFile.bind(this)
        this.extractData = this.extractData.bind(this)
        this.handleDrChange = this.handleDrChange.bind(this)
        this.handleCstChange = this.handleCstChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleUrlChange = this.handleUrlChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.completeUpload = this.completeUpload.bind(this)
        this.fileInput = React.createRef()
    }
    extractData() {
        var csv = drgProcessor.extract(this.state.wbk, null)
        var colChoices = csv.split('\n')[0].split(',')
        this.setState({ csv, colChoices })
    }
    handleFile() {
        var excelFile = this.fileInput.current.files[0]
        if (!excelFile) return
        var excelReader = new FileReader()
        excelReader.onload = e => { 
            var data = new Uint8Array(e.target.result);
            var wbk = XLSX.read(data, {type: 'array'});
            this.setState({wbk}, () => this.extractData())
        }
        excelReader.readAsArrayBuffer(excelFile)
    }
    
    completeUpload() {
        var fetchUrl = 'https://liform-backend.herokuapp.com/admin/importer/upload';
        var payload = {
            csv: JSON.stringify(this.state.csv),
            drgCol: this.state.drgCol,
            costCol: this.state.costCol,
            name: this.state.name,
            url: this.state.url,
            location: this.state.location
        }
        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            console.log("Request successful")
            this.state.requestSuccess = true
            this.forceUpdate()
          }
          )
          .catch(() =>  {
          console.log("Request failed")
          this.state.requestSuccess = false
          this.forceUpdate()
          }
          )
    }

    handleDrChange(e) {
        this.setState({drgCol: e.target.value})
    }

    handleCstChange(e) {
        this.setState({costCol: e.target.value})
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleUrlChange(e) {
        this.setState({url: e.target.value})
    }

    handleLocationChange(e) {
        this.setState({location: e.target.value})
    }

    render() {
        var colList = null
        if (this.state.colChoices.length > 0) {
            colList = this.state.colChoices.map((val, idx) => {
                return <p key={idx}>Column {idx}: {val}</p>
            })
        }
        var colInput = null
        if (colList) { 
            colInput = (
                <div>
                    <h2 className="title is-4">Select DRG Column and Pricing Column</h2>
                    {colList}
                    <br/>
                    <p><strong>DRG Column Index:</strong> <input type="text" value={this.state.drgCol} onChange={this.handleDrChange} /></p>
                    <p><strong>Pricing Column Index:</strong> <input type="text" value={this.state.costCol} onChange={this.handleCstChange} /></p> 
                    <br/>
                </div>
            )
        }
        var metadataInput = null
        if (colList) {
            metadataInput = (
                <div>
                    <h2 className="title is-4">Enter Hospital Info</h2>
                    <br/>
                    <p><strong>Hospital Name:</strong> <input type="text" value={this.state.name} onChange={this.handleNameChange} /></p>
                    <p><strong>Hospital URL:</strong> <input type="text" value={this.state.url} onChange={this.handleUrlChange} /></p>
                    <p><strong>Hospital Location:</strong> <input type="text" value={this.state.location} onChange={this.handleLocationChange} /></p> 
                    <button className="button is-primary" onClick={this.completeUpload}>Complete Upload</button>
                    <br/>
                </div>
            )
        }
        var messageConfirmation = null;
        if (this.state.requestSuccess != null) {
            if (this.state.requestSuccess) {
                messageConfirmation = (
                    <div>
                        <p><strong style={{color: 'green'}}>Request sent successfully. Thank you.</strong></p>
                    </div>
                    
                )
            }
            else {
                messageConfirmation = (
                    <div>
                        <p><strong style={{color: 'red'}}>Request send failed.</strong></p>
                    </div>
                    
                )
            }
        }

        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">Import Hospital Data</h1>
                    <br />
                    <div className="columns">
                        <div className="column">
                            <input className="input" accept=".csv,.xlsx" type="file" ref={this.fileInput} />
                            <br />
                            <br />
                            <button className="button is-link" onClick={this.handleFile}>Upload</button>
                            <br />
                            <br/>
                            {colInput}
                            {metadataInput}
                            {messageConfirmation}
                        </div>
                        <br/>
                        <div className="column is-hidden-mobile"></div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Importer