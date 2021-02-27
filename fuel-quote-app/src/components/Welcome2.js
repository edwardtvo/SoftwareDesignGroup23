import { useHistory } from "react-router-dom";
import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import React, { useState } from "react";
import NavBar from './NavBar'

    
    
    
function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
    }

const Welcome = () => {
    
    const [isButtonDisabled, disableButton] = useState(false)

    return (

        <>
        <NavBar loggedIn={true}/>
        <Container className="appjs-padding">
            <Row>
                <Col md="3"></Col>
                <Col md="auto">
                    <h1 className="title-page"
                        style={{display: isButtonDisabled ? "none" : "block"}}
                    >Welcome to COUGAR GAS INC.!</h1>
                </Col>
                <Col md="5"></Col>
            </Row>            
            <Row className="appjs-button-padding">
                <Col md="5"></Col>
                <Col md="auto">    
                    <h1>Click an option on the Navigation Bar above to navigate to a page</h1>
                    <h2>Go to "Profile Management if you haven't set up your profile</h2>
                </Col>
                <Col md="auto">    
                    
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
    )
      }

export default Welcome
