import {Container, Button, Form, Row, Col, Modal} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import NavBar from './NavBar'
import axios from 'axios';

require('react-datepicker/dist/react-datepicker.css')

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

const apiUrl = 'http://localhost:4000';
axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('token');
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const QuoteForm = () => {
    /*
    Form Validation https://react-bootstrap.netlify.app/components/forms/#forms-validation-input-group
    handleSubmit function checks that al required fields contain valid input
    Form.Control.Feedback prompts user to correct info if necessary
    Cannot submit form without validation
    To fix immediate refresh on click/submit https://github.com/react-bootstrap/react-bootstrap/issues/1510
    Stop modal from appearing if validation check fails https://stackoverflow.com/questions/58753515/bootstrap-4-validation-disable-submit-button-until-form-validated
    */
    const [validated, setValidated] = useState(false)
    const [username, setUsername] = useState('')
    const [gallons, setGallons] = useState(0)
    const [checked, setChecked] = useState(false)
    const [price_per_gallon, setPricePerGallon] = useState(1.50)
    const [show, setShow] = useState(false)
    const [delivery_date, setDeliveryDate] = useState(new Date())
    const [isLoading, setLoading] = useState(false);
        /* address from token retrieved here */
    const [delivery_address, getDeliveryAddress] =  useState('123 Houston St');




    useEffect(() => {
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);

    const handleClick = () => setLoading(true);

    const calcQuote = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation()
            event.preventDefault()
        }
        else {
            event.preventDefault();
            setShow(true)
            setValidated(true)
            const quoteObj = {
                username: username,
                gallons_requested: gallons,
                delivery_address: delivery_address,
                delivery_date: delivery_date,
                price_per_gallon: price_per_gallon
                }
            
                axios.post('http://localhost:4000/users/quoteupdate', quoteObj)
                .then((res) => {
                    console.log(res.data)
                }).catch((error) => {
                console.log(error)
            });
        
        }
    }

    const handleClose = () => {
        setValidated(false);
        setShow(false);
        window.location.reload();
    }

    return (
        <>
        <NavBar loggedIn={true}/>
            <Container fluid className='profman-padding'>
                <h1 className="title-page">Get a Quote:</h1>
                <Form noValidate validated={validated} onSubmit={calcQuote}>
                    {/*Gallon Request*/}
                    <Form.Group controlId='validationGallonReq'>
                    <Row className="quoteform-padding">
                            <Col md="4">
                           <Form.Label>Insert username to archive this quote: </Form.Label>
                                <Form.Control required
                                              type='text'
                                              value={username}
                                              onChange={(e) => {
                                                setUsername((e.target.value))
                                            }} />
                                <Form.Control.Feedback type="invalid">Please provide username</Form.Control.Feedback>   
                            </Col>                

                        </Row> 
                        <Row>
                            <Col className='col-auto'>
                                <Form.Label>Gallons Requested:</Form.Label>
                            </Col>
                            <Col className='col-auto'>
                                <Form.Control required
                                              className='gallonReq'
                                              type='number'
                                              placeholder='0'
                                              min='1'
                                              value={gallons}
                                              onChange={(e) => {
                                                  setGallons(parseInt(e.target.value))
                                              }}
                                />
                                <Form.Control.Feedback type='invalid'>Please provide a valid number</Form.Control.Feedback>
                            </Col>
                        </Row>
                        
                    </Form.Group>

                    {/*Verify Address*/}
                    <Form.Group controlId='validationAddress'>
                        <Row>
                            <Col className='col-auto'><p>{delivery_address}</p></Col>
                            <Col>
                                <Form.Check required
                                            type='checkbox'
                                            label='Delivery Address Verified'
                                            feedback='Please verify address'
                                            onChange={() => {
                                                setChecked(!checked)
                                            }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    {/*Delivery Date*/}
                    {/* Delivery Date validated using react-datepicker DatePicker
                https://reactdatepicker.com/
                https://github.com/Hacker0x01/react-datepicker/issues/879

                possible alt date picker https://getdatepicker.com/4/
                */}
                    <Form.Group>
                        <Form.Label>Delivery Date: </Form.Label>
                        <DatePicker
                            className='delivDatePicker'
                            selected={delivery_date}
                            value={delivery_date}
                            onChange={date => {setDeliveryDate(date)}}
                            minDate={new Date()}
                            showDisabledMonthNavigation
                        />
                    </Form.Group>

                    <Button variant='danger' type='submit'>Calculate</Button>
                </Form>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop='static'
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Calculated Cost</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Price per gallon: $ {parseFloat(price_per_gallon.toString()).toFixed(2)}</p>
                        <p>Total cost: $ {(gallons * parseFloat(price_per_gallon.toString())).toFixed(2)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={handleClose}>Get Another Quote</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default QuoteForm