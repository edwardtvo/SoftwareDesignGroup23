import {Nav, Navbar} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import QuoteForm from './components/QuoteForm'

const App = () => {
    return (
        <div className="App">
            <Navbar bg='light' variant='light' sticky='top' expand='xl'>
                <Navbar.Text className='pr-3 ml-auto'>USERNAME</Navbar.Text>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <Nav.Link className='ml-auto' href='/home'>Home</Nav.Link>
                        <Nav.Link className='ml-auto' href='/quoteform'>Get Quote</Nav.Link>
                        <Nav.Link className='ml-auto' href='/home'>Quote History</Nav.Link>
                        <Nav.Link className='ml-auto' href='/home'>Account Details</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Router>
                        <Link to="/quoteform"> </Link>

                <Switch>
                    <Route path="/quoteform">
                        <QuoteForm/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
