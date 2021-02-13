import React from 'react'
import {Container, Button, Form, Row, Col} from 'react-bootstrap'


const Login = () => {
    return (
        
        <Container fluid>
            
            <Row>
                <Col md="5"></Col>
                <Col md="auto">
                    <h1>Welcome!</h1>
                </Col>
                <Col md="5"></Col>
            </Row>

            <Form>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"/>
                </Col>
            </Row>
            <Row>
                <Col md="4"></Col>
                <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"/>
                </Col>
                <Col md="4"></Col>
            </Row>
            </Form>
        <br />
        <Row>
            <Col md="6"></Col>
            <Col md="1">    
                <p></p><p>Sign up</p>
            </Col>
            <Col md="auto">    
                <Button variant="primary">Login</Button>{' '}
            </Col>
            <Col></Col>
        </Row>

        

        </Container>
    )
}

export default Login
