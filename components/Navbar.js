import Router from 'next/router';
export default function Navbar() {
    return (
        <div className="liform-navbar">
            <div className="container liform-nav-container">
                <img src="/logo.svg" className="liform-logo" onClick={() => Router.push('/')} style={{cursor: 'pointer'}} />
                <input type="text" className="input liform-top-search" placeholder="search for a treatment or DRG code" />
            </div>
            <style jsx>
                {`
                    * {
                        font-family: Archivo, sans-serif;
                    }
                    .liform-navbar {
                        padding: 20px;
                        background: #7DFFCF;
                    }
                    
                    .liform-nav-container {
                        display: flex;
                        align-items: center;
                    }
                    
                    .liform-logo {
                        height: 2rem;
                    }
                    
                    .liform-top-search {
                        margin-left: 40px;
                        background: none;
                        border: none;
                        border-bottom: 2px solid #1800BD;
                        outline: none;
                        color: #1800BD;
                        box-shadow: none;
                        border-radius: 0;
                        font-weight: 600;
                        padding-bottom: 0;
                        font-size: 1.1rem;
                        letter-spacing: -0.02em;
                    }
                    
                    .liform-top-search::placeholder {
                        color: #1800BD;
                        opacity: 0.6;
                    }
                    
                    .liform-top-search:hover {
                        border-bottom: 2px solid #1800BD;
                    }
                    
                    .liform-top-search:focus, .liform-top-search:active  {
                        outline: none;
                        border-bottom: 2px solid #1800BD;
                        box-shadow: none;
                    }
                    
                    @media screen and (max-width: 500px) {
                        .liform-top-search {
                            margin-left: 20px;
                        }
                    }
                `}
            </style>
        </div>
    )
};
