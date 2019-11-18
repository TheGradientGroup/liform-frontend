import { useRouter } from 'next/router';
import Head from 'next/head';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal';
import WithNavbar from '../../components/WithNavbar';

function StatCategory(props) {
    return (
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
}

export default function TreatmentDetail() {
    const router = useRouter();
    const position = [32.985886, -96.748264];
    return (
        <WithNavbar>
            <Head>
                <title key="title">Liform: Treatment ID {router.query.id}</title>
            </Head>
            <section className="section treatment-hero">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-2">Sub-cranial multifaction with MCC</h1>
                            <h2 className="subtitle">DRG treatment ID: {router.query.id}</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <h3 className="title is-3">Cost Data</h3>
                    <StatCategory category="This Year, National*" low="$16,224" high="$48,238" average="$23,483" />
                    <StatCategory category="This Year, Texas*" low="$17,659" high="$40,548" average="$20,484" />
                    <StatCategory category="This Year, DFW Area*" low="$18,384" high="$30,436" average="$22,348" />
                    <hr />
                    <br />
                    <h3 className="title is-3">Costs Near You*</h3>
                    <div className="columns">
                        <div className="column">
                            <Map center={position} zoom={13} style={{ height: '400px' }} attributionControl={false}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                   </Popup>
                                </Marker>
                            </Map>
                        </div>
                        <div className="column" style={{ height: '400px', overflow: 'scroll' }}>
                            <h4 className="title is-4 has-text-centered">Hospitals Nearby</h4>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                            <div className="box">hi</div>
                        </div>
                    </div>
                    <p className="disclaimer"><small>*Based on a combination of hospital-reported and self-uploaded cost reports. Data exculsively for informational purposes.</small></p>
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
};