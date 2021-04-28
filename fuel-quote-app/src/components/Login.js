import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import * as actions from '../store/actions/index.js';
import logo from '../images/cougar-gas.png'
import { withCookies, useCookies } from 'react-cookie';

/* Login Validation:
- Username: 3-30 characters, required
- Password: 5-50 characters, required
*/

const bcrypt = require('./custom-bcrypt');

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
const Login = (props) => {
  const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [cookies, setCookie] = useCookies(['user'])


    let history=useHistory();

    useEffect(() => {
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);

  const handleClick = () => setLoading(true);

  const handleRegexValidation = (userObj) => {
    if ((userObj.password.match(/^((?=.*[A-Z])(?=.*[0-9]).{5,50})$/) != null) &&
        (userObj.username.match(/^(\w{3,30})$/) != null))
        return true;
    else 
      return false;
  }


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(false);
    event.preventDefault();

    /*check front-end validation */
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {    

      
      const userObj = {
        username: username,
        password: /*bcrypt.hash(password)*/ password
      }

      if (handleRegexValidation(userObj)) {

        /* authenticate user credentials */
        axios.post('http://localhost:4000/users/authenticate', userObj)
        .then((res) => {
        setCookie('user', userObj.username, {
          path: '/'
        });
        console.log(cookies.user)
        window.location.reload(); //history.push('/home')
        
        }).catch((err) => {
        console.log('Error in Login axios.post: ', err);
        alert('User not found with inputted credentials. Please try again');
        })
      setValidated(true);
      }
      else {
        setValidated(false);
        alert('Username must be between 3 and 30 characters.\nPassword must be between 5 and 50 characters with at least one uppercase & one number')
      }
    }

  }
  
    return (
        <>

        
        
        <Container fluid className="title-padding">

            <div style={{"alignContent":"center"}}>
                <img src={logo} alt="Cougar Gas Logo"/>
            </div>
            <div style={{"alignContent":"center", "paddingBottom":"30px"}}>
            <h1 className="title-page">Welcome to COUGAR GAS INC.!</h1>
            </div>


            
           

            <Form noValidate 
                  validated={validated}
                  onSubmit={handleSubmit}>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                  
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                                  onChange={(e) => setUsername(e.target.value)}
                                  required/>
                    <Form.Control.Feedback type="invalid">Please provide a username</Form.Control.Feedback>
                </Col>
            </Row>
            <Row>
                <Col md="4"></Col>
                <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                                  onChange={(e) => setPassword(e.target.value)}
                                  required/>
                    <Form.Control.Feedback type="invalid">Please provide a password</Form.Control.Feedback>
                </Col>
                <Col md="4"></Col>
            </Row>
        <br />
        <Row>
            <Col md="5"></Col>
            <Col md="auto"><Button variant="light" href="/registration">Sign up</Button></Col>
            <Col md="auto">    
                <Button variant="danger" type="submit">Log in</Button>{' '}
            </Col>
            <Col></Col>
        </Row>
        </Form>


        

        </Container>
        </>
    )
}

/* const mapStateToProps = state => ({
  auth: state.AuthReducer
}); */

//export default connect(mapStateToProps, actions)(Login);
export default Login;