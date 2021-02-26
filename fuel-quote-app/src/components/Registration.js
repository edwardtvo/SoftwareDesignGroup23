import React, { useEffect, useState } from "react";
import {Container, Button, Form, Row, Col} from 'react-bootstrap'

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

const Registration = () => {
    const [isLoading, setLoading] = useState(false);

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
  }

    return (
        
        <Container fluid>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <Col md="5"></Col>
                <Col md="auto">
                    <h1>Registration</h1>
                </Col>
                <Col md="5"></Col>
            </Row>

            <Form>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control pattern="[\w\d]+" type="text" required/> 
                    <Form.Control.Feedback type="invalid">Please follow the username rules below</Form.Control.Feedback>
                </Col>
            </Row>
            <Row>
                <Col md="4"></Col>
                <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required/>
                    <Form.Control.Feedback type="invalid">Please follow the password rules below</Form.Control.Feedback>

                </Col>
                <Col md="4"></Col>
            </Row>
            </Form>
        <br />
        <Row>
            <Col md="6"></Col>
            <Col md="auto">    
            <Button variant="danger" 
                    type="submit">Submit</Button>{' '}
                    {/*disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}
                    href="/profilemanagement"
                    {isLoading ? 'Confirming...' : 'Submit'}*/}
            </Col>
            <Col md="auto">
                {/* add boolean here to make sure registration is complete prior to profman */}
                
            </Col>
            <Col></Col>
        </Row>

        
        </Form>
        </Container>
    )
}

export default Registration
