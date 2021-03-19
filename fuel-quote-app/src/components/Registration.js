import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import NavBar from './NavBar'
import { useHistory } from "react-router-dom";



const Registration = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let history=useHistory();


  const handleSubmit = (event) => {
    const form = event.currentTarget;
      event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        const userObj = {
            username: username,
            password: password
        }
        axios.post('http://localhost:4000/users/create', userObj)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
        });
        
        setValidated(true);
        history.push("/login")
    }
  }
  
    return (
        <>

        <NavBar loggedIn={false}/>
        
        <Container fluid className="title-padding">
            
            <Row>
                <Col md="5"></Col>
                <Col md="auto">
                    <h1 className="title-page">Registration</h1>
                </Col>
                <Col md="5"></Col>
            </Row>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  required
                    />
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
                                  required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a password</Form.Control.Feedback>
                </Col>
                <Col md="4"></Col>
            </Row>
        <br />
        <Row>
            <Col md="6"></Col>
            <Col md="auto">    {/* TODO: redirect AND validate at the same time */}
                                {/* can't redirect at the moment */}
                <Button variant="danger" type="submit">Sign up</Button>{' '}
            </Col>
            <Col></Col>
        </Row>
        </Form>


        

        </Container>
        </>
        
    )
}

export default Registration
