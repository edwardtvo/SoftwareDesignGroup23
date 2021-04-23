import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from 'axios';
import { useHistory, Redirect } from "react-router-dom";
const bcrypt = require('./custom-bcrypt');

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
const Login = () => {
  const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    let history=useHistory();

    useEffect(() => {
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);

  const handleClick = () => setLoading(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    /*check front-end validation */
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {    
      const userObj = {
        username: username,
        password: /*bcrypt.hash(password)*/ password
      }

    
      
      /* authenticate user credentials 
      axios.post('http://localhost:4000/users/authenticate', userObj)*/
      fetch('http://localhost:4000/users/passportlogin', {
        method: 'POST',
        body: JSON.stringify(userObj),
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        console.log('inside res of Login axios call')
        if (res.data.message.validPassword === true) {
          //console.log('going to profman!');
          history.push('/profilemanagement')
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      })
      /*                                       
      axios.post('http://localhost:4000/users/create', userObj)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
        }); */

    }
    setValidated(true);

  }
  
    return (
        <>

        
        
        <Container fluid className="title-padding">
            
            <Row>
                <Col md="5"></Col>
                <Col md="auto">
                    <h1 className="title-page">Welcome!</h1>
                </Col>
                <Col md="5"></Col>
            </Row>

            <Form noValidate 
                  validated={validated}
                  onSubmit={handleSubmit}>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" 
                                  value={username} 
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
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required/>
                    <Form.Control.Feedback type="invalid">Please provide a password</Form.Control.Feedback>
                </Col>
                <Col md="4"></Col>
            </Row>
        <br />
        <Row>
            <Col md="6"></Col>
            <Col md="auto"><Button variant="light" href="/Registration">Sign up</Button></Col>
            <Col md="auto">    {/* TODO: redirect AND validate at the same time */}
                                {/* can't redirect at the moment */}
                <Button variant="danger" type="submit">Log in</Button>{' '}
            </Col>
            <Col></Col>
        </Row>
        </Form>


        

        </Container>
        </>
    )
}

export default Login
