import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';
import React, { useEffect, useState } from "react";


import QuoteForm from './components/QuoteForm'
import ProfileManagement from './components/ProfileManagement'
import Login from './components/Login'
import Registration from './components/Registration'
import History from './components/History'
import AccountDetails from './components/AccountDetails'
import Navbar from './components/NavBar'
import Home from './components/Home'
import withAuthorization from './components/withAuthorization'
import { connect } from 'react-redux'
import * as actions from './store/actions'




//const mongoose = require('mongoose')

const App = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const [is_logged_in, setLoggedIn] = useState(false);


    useEffect(() => {
        if (cookies.user === '' || cookies.user === undefined) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }, [cookies.user])

    return (
        <div>
            <div className={!is_logged_in ? "table display-on" : "table display-off"}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
                
            </div>

            <div className={is_logged_in ? "table display-on" : "table display-off"}>
            <Navbar loggedIn={true}/>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Home}/>
                    <Route exact path="/register" component={Home}/>
                    <Route exact path="/home" component={Home} />
                    <Route path="/getquote" component={QuoteForm} />
                    <Route path="/profilemanagement" component={ProfileManagement}/>
                    {/* <Route path="/login" component={Login} /> */}
                    <Route path="/quotehistory" component={History} />
                    <Route path="/accountdetails" component={AccountDetails} />
                </Switch>
            </Router>
            </div>
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
