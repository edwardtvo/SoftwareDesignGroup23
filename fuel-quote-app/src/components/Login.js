import { useHistory } from "react-router-dom";
import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from 'axios';

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    let history=useHistory();

    useEffect(() => {
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);

  const handleClick = () => setLoading(true);

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() == true) history.push("/welcome");

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

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required/>
                    <Form.Control.Feedback type="invalid">Please provide a username</Form.Control.Feedback>
                </Col>
            </Row>
            <Row>
                <Col md="4"></Col>
                <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required/>
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
