import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { React, useEffect } from 'react'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';

import QuoteForm from './components/QuoteForm'
import ProfileManagement from './components/ProfileManagement'
import Login from './components/Login'
import Registration from './components/Registration'
import History from './components/History'
import AccountDetails from './components/AccountDetails'
import Home from './components/Home'
import withAuthorization from './components/withAuthorization'
import { connect } from 'react-redux'
import * as actions from './store/actions'




//const mongoose = require('mongoose')

const App = () => {

    /* useEffect(() => {
        props.updateUser();
    }) */

    return (
        <div className="table">
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/getquote" component={QuoteForm} />
                    <Route path="/profilemanagement" component={ProfileManagement}/>
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/quotehistory" component={History} />
                    <Route path="/accountdetails" component={AccountDetails} />
                </Switch>
            </Router>
        </div>

    );
}

function mapStateToProps(state) {
    return { 
      auth: state.AuthReducer,
     };
}

export default App;
//export default connect(mapStateToProps, actions)(App);
