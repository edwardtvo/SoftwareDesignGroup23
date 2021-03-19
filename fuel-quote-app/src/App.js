import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import QuoteForm from './components/QuoteForm'
import ProfileManagement from './components/ProfileManagement'
import Login from './components/Login'
import Registration from './components/Registration'
import History from './components/History'
import AccountDetails from './components/AccountDetails'
import Home from './components/Home'

const mongoose = require('mongoose')

const App = () => {


    return (
        <div className="table">
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/getquote" component={QuoteForm} />
                    <Route path="/profilemanagement" component={ProfileManagement} />
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/quotehistory" component={History} />
                    <Route path="/accountdetails" component={AccountDetails} />
                </Switch>
            </Router>
        </div>

    );
}


export default App;
