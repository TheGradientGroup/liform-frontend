import Link from 'next/link';
import Head from 'next/head';
import WithNavbar from "../components/WithNavbar";

export default function Index() {
    return (
        <WithNavbar>
            <div className="home">
                <div className="hero is-medium has-text-centered home-hero">
                    <div className="hero-body">
                        <h1 className="home-title">Share and compare medical bills.</h1>
                        <h2 className="home-subtitle">Liform makes major medical procedures more affordable.</h2>
                    </div>
                </div>
                <section className="section">
                    <h1 className="title is-2 has-text-centered liform-desc">How Liform Works</h1>
                    <div className="liform-steps has-text-centered">
                        <div className="liform-step">1. Search for the medical procedure you’re looking to receive</div>
                        <div className="liform-step">2. We’ll show you how much the procedure might cost at hospitals nearby</div>
                        <div className="liform-step">3. Share your medical bills to help others</div>
                    </div>
                </section>
                <footer className="footer">
                    <div className="container has-text-centered">
                        &copy; 2019 Liform Labs.
                        <br />
                        <Link href="/import"><a href="/import">Import data &rarr;</a></Link>
                    </div>
                </footer>
            </div>
            <Head>
                <title key="title">Liform: Welcome</title>
            </Head>
            <style jsx>
                {`
                    * {
                        font-family: Archivo, sans-serif;
                    }
                    .home {
                        background: #7DFFCF;
                    }
                    
                    .home-hero {
                        background: url('/hero-img.jpg');
                        background-size: cover;
                    }
                    
                    .home-title {
                        margin-top: 100px;
                        font-weight: bold;
                        font-size: 50px;
                        letter-spacing: -0.04em;
                        color: #1800BD;
                    }
                    
                    .home-subtitle {
                        margin-bottom: 100px;
                        font-size: 20px;
                        letter-spacing: -0.02em;
                        color: #1800BD;
                    }
                    
                    .liform-desc {
                        color: #1800BD;
                        letter-spacing: -0.02em;
                    }
                    
                    .liform-step {
                        letter-spacing: -0.02em;
                        font-weight: 500;
                        color: #1800BD;
                        font-size: 25px;
                        margin-top: 50px;
                    }
                    
                    footer.footer {
                        background: #6EDAB2;
                        color: #1800BD;
                    }
                `}
            </style>
        </WithNavbar>
    );
};