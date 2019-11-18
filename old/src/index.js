import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './pages/Home'
import TreatmentDetail from './pages/TreatmentDetail'
import Importer from './pages/Importer'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"


ReactDOM.render(
<Router>
    <Navbar />
    <Route exact path="/" component={Home} />
    <Route path="/treatment/:id" component={TreatmentDetail} />
    <Route path="/import" component={Importer} />
</Router>, 
document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()