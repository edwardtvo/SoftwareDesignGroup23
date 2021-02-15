import React from 'react'
import {Container, Button, Form, Row, Col} from 'react-bootstrap'


const Registration = () => {
    return (
        
        <Container fluid>
            
            <Form>
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
                </Col>
            </Row>
            <Row>
                <Col md="4"></Col>
                <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required/>
                </Col>
                <Col md="4"></Col>
            </Row>
            </Form>
        <br />
        <Row>
            <Col md="6"></Col>
            <Col md="auto">    
            <Button variant="primary" type="submit">Submit</Button>{' '}
            </Col>
            <Col md="auto">
                {/* add boolean here to make sure registration is complete prior to profman */}
            <Button variant="secondary" href="/profilemanagement">Go to Profile Management</Button>{' '}
            </Col>
            <Col></Col>
        </Row>

        
        </Form>
        </Container>
    )
}

export default Registration
