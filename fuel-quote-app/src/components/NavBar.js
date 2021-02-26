import {Nav, Navbar} from "react-bootstrap"

const NavBar = ({loggedIn}) => {
    return (
    <div>
        <Navbar bg='navbar-color' variant='dark' sticky='top' expand='xl'>
            <Navbar.Brand href='/home' className='cougar-gas'>COUGAR GAS INC.</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    {/*<Nav.Link className='nav-link ml-auto' href='/home'>Home</Nav.Link>*/}
                    {/*<Nav.Link className='nav-link ml-auto' href='/login'>Login</Nav.Link>*/}
                    {/*<Nav.Link className='nav-link ml-auto' href='/registration'>Registration</Nav.Link>*/}
                    <Nav.Link className='nav-link ml-auto' disabled={!loggedIn} href='/profilemanagement'>Profile Management</Nav.Link>
                    <Nav.Link className='nav-link ml-auto' disabled={!loggedIn} href='/getquote' >Get Quote</Nav.Link>
                    <Nav.Link className='nav-link ml-auto' disabled={!loggedIn} href='/quotehistory' >Quote History</Nav.Link>
                    <Nav.Link className='nav-link ml-auto' disabled={!loggedIn} href='/accountdetails'>Account Details</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    )
}

export default NavBar