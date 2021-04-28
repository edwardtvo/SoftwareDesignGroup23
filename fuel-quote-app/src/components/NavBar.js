import {Nav, Navbar} from "react-bootstrap"
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import logo from '../images/cougar-gas.jpeg'
import './NavBar.css'

const NavBar = (props) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [is_logged_in, setLoggedIn] = useState(props.loggedIn);
    let history = useHistory();


    const logOut = () => {
        // remove (reset) cookie
        setCookie('user', '', {
            path: '/'
        });
        setLoggedIn(false);
        window.location.reload();
        history.push('/');
    }
    return (
    <div>
        <Navbar bg='navbar-color' variant='dark' sticky='top' expand='xl'>
            <img className="logo-size" src={logo} alt="Logo"/>
            <Navbar.Brand href='/home' className='cougar-gas'>COUGAR GAS INC.</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    {/*<Nav.Link className='nav-link ml-auto' href='/home'>Home</Nav.Link>*/}
                    {/*<Nav.Link className='nav-link ml-auto' href='/login'>Login</Nav.Link>*/}
                    {/*<Nav.Link className='nav-link ml-auto' href='/registration'>Registration</Nav.Link>*/}
                    <Nav.Link className={is_logged_in ? 'nav-link ml-auto display-on' : 'display-off'}  href='/home'>Home</Nav.Link>
                    <Nav.Link className={is_logged_in ? 'nav-link ml-auto display-on' : 'display-off'}  href='/profilemanagement'>Profile Management</Nav.Link>
                    <Nav.Link className={is_logged_in ? 'nav-link ml-auto display-on' : 'display-off'}  href='/getquote' >Get Quote</Nav.Link>
                    <Nav.Link className={is_logged_in ? 'nav-link ml-auto display-on' : 'display-off'}  href='/quotehistory' >Quote History</Nav.Link>
                    <Nav.Link className={is_logged_in ? 'nav-link ml-auto display-on' : 'display-off'}  onClick={(e) => logOut()}>Log Out</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    )
}

export default NavBar