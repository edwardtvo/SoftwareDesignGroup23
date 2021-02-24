import {Nav, Navbar, Form} from 'react-bootstrap'
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

const App = () => {

    return (
        <div className="App">
            <Navbar bg='314e52' variant='light' sticky='top' expand='xl'>
                <Navbar.Text className='pr-3 ml-auto'>COUGARGAS INC.</Navbar.Text>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <Nav.Link className='ml-auto' href='/home'>Home</Nav.Link>
                        <Nav.Link className='ml-auto' href='/login'>Login</Nav.Link>
                        <Nav.Link className='ml-auto' href='/registration'>Registration</Nav.Link>
                        <Nav.Link className='ml-auto' href='/profilemanagement'>Profile Management</Nav.Link>
                        <Nav.Link className='ml-auto' href='/quoteform'>Get Quote</Nav.Link>
                        <Nav.Link className='ml-auto' href='/home'>Quote History</Nav.Link>
                        <Nav.Link className='ml-auto' href='/home'>Account Details</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/*<img src="/images/gas-30170_640.png" responsive / > */}
    
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
            </Router>
        </div>
    );
}

export default App;
