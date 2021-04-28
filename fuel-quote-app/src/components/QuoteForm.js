import {Container, Button, Form, Row, Col, Modal, InputGroup} from 'react-bootstrap'
import React, {useEffect, useState} from "react";
import DatePicker from 'react-datepicker'
import NavBar from './NavBar'
import {withCookies, useCookies} from 'react-cookie';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import './QuoteForm.css'

require('react-datepicker/dist/react-datepicker.css')

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}

const apiUrl = 'http://localhost:4000';
axios.interceptors.request.use(
    config => {
        const {origin} = new URL(config.url);
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

    const company_factor = 0.1;
    const price_per_gallon = 1.50;
    const [location_factor, setLocation_factor] = useState(0.00)
    const [rate_history_factor, setRate_history_factor] = useState(0.00)
    const [gallons_requested_factor, setGallons_requested_factor] = useState(0.00)
    const [margin, setMargin] = useState(0.00)
    const [suggested_price, setSuggestedPrice] = useState(0.00)
    const [final_price, setFinal_price] = useState(0.00)
    const [validated, setValidated] = useState(false)
    const [username, setUsername] = useState('')
    const [gallons, setGallons] = useState(0)
    const [gallonsInvalid, setGallonsInvalid] = useState(1);
    const [checked, setChecked] = useState(false)
    const [show, setShow] = useState(false)
    const [delivery_date, setDeliveryDate] = useState(new Date())
    const [disableButton, setDisableButton] = useState('true');
    const [isLoading, setLoading] = useState(false);
    /* address from token retrieved here */
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [cookies, setCookie] = useCookies(['user'])

    let history = useHistory();


    useEffect(() => {
        console.log('username: ', cookies.user);
        axios.post('http://localhost:4000/users/current_user', {username: cookies.user})
            .then((res) => {
                if (res.status === 200) {
                    console.log('res.data: ', res.data);
                    // Set username
                    setUsername(cookies.user)
                    // Get user address info
                    if (res.data.address2 === null || res.data.address2 === undefined) {
                        console.log('address2 is undefined');
                        setDeliveryAddress(res.data.address1);
                        console.log('address1: ', res.data.address1);
                    } else {
                        console.log('address2: ', res.data.address2);
                        let combined_address = res.data.address1 + ', ' + res.data.address2;
                        console.log('combined_address: ', combined_address)
                        setDeliveryAddress(res.data.address1 + ', ' + res.data.address2);
                    }

                    // Determine location factor
                    console.log(res.data.state)
                    if (res.data.state === "TX") {
                        setLocation_factor(0.02)
                    } else {
                        setLocation_factor(0.04)
                    }
                    console.log(username)
                    axios.post('http://localhost:4000/users/history', {username: cookies.user})
                        .then((res) => {
                            if (res.data === "") setRate_history_factor(0.01)
                            else setRate_history_factor(0)
                        })

                } else if (res.status === 404) {
                    console.log('res.status: ', res.status)
                    history.push('/')
                }
            }).catch((error) => {
            console.log('Error trying to fetch user data from cookie', error);
        })

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    /* Ensure that factors are updated before margin and price are calculated */
    useEffect(() => {
        console.log(`location factor: ${location_factor}`)
        console.log(`rate history factor: ${rate_history_factor}`)
        console.log(`gallons requested factor: ${gallons_requested_factor}`)

        setMargin(price_per_gallon * (location_factor - rate_history_factor + gallons_requested_factor + company_factor));
        setSuggestedPrice(price_per_gallon + margin);
        setFinal_price(gallons * suggested_price);

        console.log(`calculated margin: ${margin}`)
        console.log(`calculated suggested price: ${suggested_price}`)
        console.log(`calculated final price: ${final_price}`)

        // Enable "Get Quote" button
        setDisableButton('false');

    }, [location_factor, rate_history_factor, gallons_requested_factor, gallons])

    const calcQuote = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation()
            event.preventDefault()
        } else {
            event.preventDefault();
            setShow(true)
            setValidated(true)
            setDisableButton('true');
        }
    }

    const submitQuote = () => {
        const quoteObj = {
            username: username,
            gallons_requested: gallons,
            delivery_address: deliveryAddress,
            delivery_date: delivery_date,
            price_per_gallon: suggested_price
        }
        axios.post('http://localhost:4000/users/quoteupdate', quoteObj)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
        });

        setValidated(false);
        setShow(false);
    }

    const handleClose = () => {
        setValidated(false);
        setShow(false);
    }

    return (
        <div>
            <Container className='profman-padding'>
                <h1 className="title-page">Get a Quote:</h1>
                <Row>
                    <Col md="4"/>
                    <Col style={{"paddingTop": "50px"}}>
                        <Form noValidate validated={validated} onSubmit={calcQuote}>
                            {/*Gallon Request*/}
                            <Form.Group controlId='validationGallonReq'>

                                <Row>
                                    <Col className='col-auto' style={{"paddingLeft": "40px", "paddingTop": "0.5em"}}>
                                        <Form.Label>Gallons Requested:</Form.Label>
                                    </Col>
                                    <Col className='col-auto'>
                                        <InputGroup hasValidation>
                                        <Form.Control required
                                                      isInvalid={gallonsInvalid}
                                                      className='gallonReq'
                                                      type='number'
                                                      placeholder='0'
                                                      min='1'
                                                      value={gallons}
                                                      onChange={(e) => {
                                                          setDisableButton('true');
                                                          setGallons(parseInt(e.target.value))
                                                          // Determine gallons requested factor
                                                          if (gallons < 1000) {
                                                              setGallons_requested_factor(0.03);
                                                          } else {
                                                              setGallons_requested_factor(0.02)
                                                          }
                                                          if (gallons > 0) {
                                                              setGallonsInvalid(0)
                                                          } else {setGallonsInvalid(1)}
                                                      }}
                                        />
                                        <Form.Control.Feedback type='invalid'>Please provide a
                                            number greater than zero</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form.Group>

                            {/*Verify Address*/}
                            <Form.Group controlId='validationAddress'>
                                <Row>
                                    <Col md="auto" className="address-box"><p
                                        style={{"font-weight": "bold"}}>{deliveryAddress}</p></Col>
                                    <Col style={{"paddingTop": "20px"}}>
                                        <Form.Check required
                                                    isInvalid={!checked}
                                                    type='checkbox'
                                                    label='Correct Delivery Address?'
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
                                <Col>
                                    <Form.Label style={{"paddingLeft": "4.2em", "paddingRight": "0.8em"}}>Delivery
                                        Date: </Form.Label>
                                    <DatePicker
                                        className='delivDatePicker'
                                        selected={delivery_date}
                                        value={delivery_date}
                                        onChange={date => {
                                            setDeliveryDate(date)
                                        }}
                                        minDate={new Date()}
                                        showDisabledMonthNavigation
                                    />
                                </Col>
                            </Form.Group>

                            <div style={{"paddingLeft": "140px"}}><Button variant='danger' type='submit'
                                                                          disable={disableButton}>Get Quote</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>

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
                        <p>Price per gallon: $ {parseFloat(suggested_price.toString()).toFixed(2)}</p>
                        <p>Total cost: $ {parseFloat(final_price.toString()).toFixed(2)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={submitQuote}>Submit Confirmation</Button>
                        <Button variant='secondary' onClick={handleClose}>Get Another Quote</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

export default QuoteForm