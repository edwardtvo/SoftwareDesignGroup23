import {Nav, Navbar} from "react-bootstrap"

const NavBar = () => {
    return (
    <div>
        <Navbar bg='navbar-color' variant='dark' sticky='top' expand='xl'>

            <Navbar.Brand href='/home' className='cougar-gas'>COUGAR GAS INC.</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    <Nav.Link className='nav-link' href='/home'>Home</Nav.Link>
                    <Nav.Link className='ml-auto' href='/login'>Login</Nav.Link>
                    <Nav.Link className='ml-auto' href='/registration'>Registration</Nav.Link>
                    <Nav.Link className='ml-auto' href='/profilemanagement'>Profile Management</Nav.Link>
                    <Nav.Link className='ml-auto' href='/quoteform'>Get Quote</Nav.Link>
                    <Nav.Link className='ml-auto' href='/history'>Quote History</Nav.Link>
                    <Nav.Link className='ml-auto' href='/accountdetails'>Account Details</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    )
}

export default NavBar