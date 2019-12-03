import { useRef, createRef, Component } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Error from 'next/error'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet-universal';
import WithNavbar from '../../components/WithNavbar';
import axios from 'axios';

const StatCategory = props => (
        <div className="stat-category">
            <hr />
            <h4 className="title is-5">{props.category}</h4>
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Lowest</p>
                        <p className="title">{props.low}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Average</p>
                        <p className="title">{props.average}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Highest</p>
                        <p className="title">{props.high}</p>
                    </div>
                </div>
            </nav>
        </div>
);


const LocationStatCard = props => (
    <div className="box">
        <div className="columns is-mobile">
            <div className="column is-6">
                <h5 className="title is-6">{props.name}</h5>
                <h6 className="subtitle is-7">{props.location}</h6>
            </div>
            <div className="column has-text-right">
                <div className="subtitle is-6">{props.price} avg</div>
            </div>
        </div>
    </div>
);

class TreatmentDetail extends Component {

    constructor(props) {
        super(props);
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        this.state = {
            lat: props.lat,
            lon: props.lon,
            nearMe: props.nearMe
        };
    }

    static async getInitialProps({ query }) {
        try {
            const data = (await axios.get(`${process.env.API_SERVER}/info/${query.id}`)).data,
                location = (await axios.get(`http://api.ipstack.com/check?access_key=${process.env.IPSTACK_KEY}`)).data,
                nearMe = (await axios.get(`${process.env.API_SERVER}/nearme/${query.id}/${location.latitude}/${location.longitude}`)).data
            var nationalStats = await axios.get(`${process.env.API_SERVER}/stats/${query.id}/national`)
            nationalStats = nationalStats.data.length > 0 ? nationalStats.data[0] : {}
            var stateStats = await axios.get(`${process.env.API_SERVER}/stats/${query.id}/${location.region_code}`)
            stateStats = stateStats.data.length > 0 ? stateStats.data[0] : {}
            return {
                drg: data.drg,
                humanName: data['human_name'],
                name: data.name,
                error: false,
                lat: location.latitude,
                lon: location.longitude,
                state: location.region_code,
                nationalStats,
                stateStats,
                nearMe,
                query
            }
        } catch (err) {
            return { drg: 0, humanName: '', name: '', error: true }
        }
    }

    handleMovement(e) {
        axios
            .get(`${process.env.API_SERVER}/nearme/${this.props.query.id}/${e.center[0]}/${e.center[1]}`)
            .then(res => {
                if (res.status !== 200) {
                    return;
                }
                this.setState({ nearMe: res.data })
            })
    }

    render() {
        if (this.props.error) {
            return <Error statusCode={404} />
        }
        const nationalStats = {
            low: this.props.nationalStats.min ? this.formatter.format(this.props.nationalStats.min) : 'none',
            high: this.props.nationalStats.max ? this.formatter.format(this.props.nationalStats.max) : 'none',
            avg: this.props.nationalStats.avg ? this.formatter.format(this.props.nationalStats.avg) : 'none'
        };
        const stateStats = {
            low: this.props.stateStats.min ? this.formatter.format(this.props.stateStats.min) : 'none',
            high: this.props.stateStats.max ? this.formatter.format(this.props.stateStats.max) : 'none',
            avg: this.props.stateStats.avg ? this.formatter.format(this.props.nationalStats.avg) : 'none'
        };
        return (
            <WithNavbar>
                <Head>
                    <title key="title">Liform: {this.props.humanName}</title>
                </Head>
                <section className="section treatment-hero">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title is-2">{this.props.humanName}</h1>
                                <h2 className="subtitle">DRG treatment ID: {this.props.drg}</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h3 className="title is-3">Cost Data</h3>
                        <StatCategory category="Price, National*" low={nationalStats.low} high={nationalStats.high} average={nationalStats.avg} />
                        <StatCategory category={`Price, ${this.props.state}*`} low={stateStats.low} high={stateStats.high} average={stateStats.avg} />
                        <hr />
                        <br />
                        <h3 className="title is-3">Costs Near You*</h3>
                        <div className="columns">
                            <div className="column">
                                <Map center={[this.state.lat, this.state.lon]} zoom={13} style={{ height: '400px' }} attributionControl={false} onViewportChanged={this.handleMovement.bind(this)}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {this.state.nearMe.map(x => {
                                        var lon = x.location.coordinates[0]
                                        var lat = x.location.coordinates[1]
                                        return (
                                            <Marker position={[lat, lon]} key={`${lat}${lon}`}>
                                                <Tooltip>
                                                    <strong>{x.name}</strong>: {x.city}, {x.state}
                                                </Tooltip>
                                            </Marker>
                                        );
                                    })}
                                </Map>
                            </div>
                            <div className="column" style={{ height: '400px' }}>
                                <h4 className="title is-4 has-text-centered">Hospitals Nearby</h4>
                                <div style={{ height: '90%', overflow: 'scroll', padding: '5px 30px' }}>
                                    {this.state.nearMe.map(x => {
                                        console.log(x)
                                        var price = this.formatter.format(x['avg_reported'][0]['avg'])
                                        return <LocationStatCard name={x.name} location={`${x.city}, ${x.state}`} price={price} />
                                    })}
                                    {this.state.nearMe.length === 0 ? <h2 className="subtitle is-6 has-text-centered"><em>no nearby hospitals with price data</em></h2> : null}
                                </div>
                            </div>
                        </div>
                        <p className="disclaimer"><small>*Based on hospital-reported cost reports. Data exculsively for informational purposes.</small></p>
                    </div>
                </section>
                <style jsx>
                    {`
                        * {
                            font-family: Archivo, sans-serif;
                        }
                        .treatment-list {
                            padding: 16px 0px;
                        }
                        
                        .treatment-hero {
                            background: #f4f4f4;
                        }
                        
                        .disclaimer {
                            font-style: italic;
                        }
                    `}
                </style>
            </WithNavbar>
        );
    }
}

export default TreatmentDetail;