import {Container, Button, Form, Row, Col, Modal} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import NavBar from './NavBar'
import { useHistory } from "react-router-dom";
import logo from '../images/cougar-gas.png'
const bcrypt = require('./custom-bcrypt');



function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}
const Registration = () => {
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modal_show, setModalShow] = useState(false);

    let history=useHistory();

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    const handleModalClose = () => setModalShow(false);

    const handleRegexValidation = (userObj) => {
        if ((userObj.password.match(/^((?=.*[A-Z])(?=.*[0-9]).{5,50})$/) != null) &&
            (userObj.username.match(/^(\w{3,30})$/) != null))
            return true;
        else 
          return false;
      }

    const goToLogin = () => history.push('/login');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        setValidated(false);
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const userObj = {
                username: username,
                password: password
            }

            if (handleRegexValidation(userObj)) {
                axios.post('http://localhost:4000/users/create', userObj)
                .then((res) => {
                    if (res.data === 'USER_EXISTED') {
                        alert('Username already existed!');
                    } else {
                        console.log(res.data);
                        setModalShow(true);
                        setValidated(true);
                    }
                }).catch((error) => {
                    alert('Error when trying to register new user')
                    console.log(error)
                });
            } else {
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
            
            <Row style={{"paddingBottom":"30px"}}>
                <Col md="5"></Col>
                <Col md="2">
                    <h1 className="title-page">Registration</h1>
                </Col>
                <Col md="5"></Col>
            </Row>
            

            <Form   noValidate 
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
            <Col md="5"></Col>
            <Col md="auto">
                <Button variant="light" href="login">Back to Login</Button>   
            </Col>
            <Col md="auto"> 
                <Button variant="danger" type="submit" onClick={(e) => handleSubmit(e)}>Sign up</Button>{' '}
            </Col>
            <Col></Col>
        </Row>
        </Form>


        

        </Container>

                <Modal
                    show={modal_show}
                    /* onHide={(handleModalClose)} */>
                    <Modal.Header closeButton>
                        <Modal.Title>User Created!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <t2>Your account has been created!</t2>
                        <br/>
                        <t2>Log in to access your new account</t2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={() => goToLogin()}>Login</Button>
                    </Modal.Footer>
                </Modal>
        </>

    )
}

export default Registration