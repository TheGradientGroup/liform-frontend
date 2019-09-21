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
            drgCol: null,
            costCol: null,
        }
        this.handleFile = this.handleFile.bind(this)
        this.extractData = this.extractData.bind(this)
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
    render() {
        var colList = null
        if (this.state.colChoices.length > 0) {
            colList = this.state.colChoices.map((val, idx) => {
                return <p key={idx}>Column {idx}: {val}</p>
            })
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
                            {colList}
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