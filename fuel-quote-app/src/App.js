import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import React, {Component} from 'react'
import QuoteForm from './components/QuoteForm'
import ProfileManagement from './components/ProfileManagement'
import Login from './components/Login'
import Registration from './components/Registration'
import History from './components/History'
import AccountDetails from './components/AccountDetails'
import Home from './components/Home'



class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <>
                <p className="App-intro">;....{this.state.apiResponse}</p>

            <div className="table">
                <Router>
                <Switch>
                        <Route exact path="/">
                            <Redirect to="/"/>
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
            </>
                
            
        );
    }
}
/*
const App = (props) => {
    

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

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
} */



export default App;
