import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './pages/Home'
import TreatmentDetail from './pages/TreatmentDetail'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter as Router, Route} from 'react-router-dom'


ReactDOM.render(
<Router>
    <Route exact path="/" component={Home} />
    <Route path="/treatment/:id" component={TreatmentDetail} />
</Router>, 
document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
