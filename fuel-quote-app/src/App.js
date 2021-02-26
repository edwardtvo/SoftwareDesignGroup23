import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import QuoteForm from './components/QuoteForm'
import ProfileManagement from './components/ProfileManagement'
import Login from './components/Login'
import Registration from './components/Registration'
import History from './components/History'
import AccountDetails from './components/AccountDetails'

/*npm install react-bootstrap bootstrap*/
/*npm install react-table*/
/*npm start*/
import {useState} from "react"
import NavBar from "./components/NavBar";

const App = () => {

    return (
        <div className="App table">
            <Router>
                <Link to="/quoteform"> </Link>
                <Switch>
                    <Route path="/quoteform">
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
                <Link to="/history"> </Link>
                <Switch>
                    <Route path="/history">
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
