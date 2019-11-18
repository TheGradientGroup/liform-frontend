import Navbar from './Navbar';
import Head from 'next/head';

export default function WithNavbar(props) {
    return (
        <>
            <Navbar />
            {props.children}
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css" />
                <link href="https://fonts.googleapis.com/css?family=Archivo:400,500,600,700&display=swap" rel="stylesheet" />
                <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
            </Head>
        </>
    );
};