import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import QuoteForm from './components/QuoteForm'
import ProfileManagement from './components/ProfileManagement'
import Login from './components/Login'
import Registration from './components/Registration'
import History from './components/History'
import AccountDetails from './components/AccountDetails'
import Home from './components/Home'
import {Container, Button, Form, Row, Col} from 'react-bootstrap'

/*npm install react-bootstrap bootstrap*/
/*npm install react-table*/
/*npm start*/
import {useState} from "react"
import NavBar from "./components/NavBar";


const App = () => {
    
    return (
        <div className="table">
            <Router>
            <Switch>
                    <Route exact path="/">
                        <Redirect to="/login"/>
                    </Route>
                </Switch>
            <Switch>
                    <Route exact path="/home">
                        <Home/>
                    </Route>
            </Switch>
                <Link to="/getquote"> </Link>
                <Switch>
                    <Route path="/getquote">
                        <QuoteForm/>
                    </Route>
                </Switch>
                <Link to="/profilemanagement"> </Link>
                <Switch>
                    <Route path="/profilemanagement">
                        <ProfileManagement/>
                    </Route>
                </Switch>

                <Link to="/login"> </Link>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                </Switch>

                <Link to="/registration"> </Link>
                <Switch>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                </Switch>
                <Link to="/quotehistory"> </Link>
                <Switch>
                    <Route path="/quotehistory">
                        <History/>
                    </Route>
                </Switch>

                <Link to="/accountdetails"> </Link>
                <Switch>
                    <Route path="/accountdetails">
                        <AccountDetails/>
                    </Route>
                </Switch>
            </Router>
            </div>
        
    );
}



export default App;
