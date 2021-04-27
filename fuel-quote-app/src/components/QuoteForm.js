import {Container, Button, Form, Row, Col, Modal} from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import NavBar from './NavBar'
import { withCookies, useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './QuoteForm.css'

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
    
    const [User, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        zipcode: '',
        state: '',
        gallon: '',
        inState: false,
        returnee: false
    });

    const [delivery_address, setDeliveryAddress] =  useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [cookies, setCookie] = useCookies(['user'])
    const [userData, setUserData] = useState({});

    let history=useHistory();



    useEffect(() => {
        console.log('username: ',cookies.user);
        axios.post('http://localhost:4000/users/current_user', { username: cookies.user })
        .then((res) => {
          if (res.status === 200) {
          setUserData(res.data);
          console.log('res.data: ',res.data);
          if (res.data.address2 === null || res.data.address2 === undefined) {
              console.log('address2 is undefined');
              setDeliveryAddress(res.data.address1);
              console.log('address1: ',address1);
              console.log('delivery_address: ',delivery_address);
          } else {
              console.log('address2: ',res.data.address2);
              let combined_address = res.data.address1 + ', ' + res.data.address2;
              console.log('combined_address: ',combined_address)
              setDeliveryAddress(combined_address);
          }
            console.log(delivery_address);
          }
          else if (res.status === 404) {
            console.log('res.status: ', res.status)
            history.push('/')
          }
        }).catch((error) => {
          console.log('Error trying to fetch user data from cookie',error);
        })

        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }

        const Page = async() => {
            const checkUser = await axios.get('http://localhost:4000/users');

            if (checkUser) {
                setUser({
                    state: checkUser.state
                });

                if (checkUser.data.state === "TX") {
                    User.inState = true;
                } else {
                    User.inState = false;
                }
                console.log(User.inState);
            }
            else {
                alert("User not found");
            }
            
        }

        Page();
      }, [isLoading]);

    //const handleClick = () => setLoading(true);

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

            const price_per_gallon = 1.5;
            const company_factor = 0.1;
            var location_factor, rate_history_factor, gallons_requested_factor, margin, suggested_price, final_price

            if (User.inState === false) {
                location_factor = 0.04
            }
            else {
                location_factor = 0.02
            }

            if (User.returnee === false) {
                rate_history_factor = 0;
            }
            else {
                rate_history_factor = 0.01;
            }

            if (User.gallon < 1000) {
                gallons_requested_factor = 0.03;
            }
            else {
                gallons_requested_factor = 0.02;
            }

            margin = price_per_gallon * (location_factor - rate_history_factor + gallons_requested_factor + company_factor);

            suggested_price = price_per_gallon + margin;

            final_price = User.gallon * suggested_price;

            console.log(margin)
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
    // Check if user is in Texas to receive the "inState" price modifier
    /*
    const checkUser = axios.get('http://localhost:4000/users');

    if(checkUser){
        setUser({
            state: checkUser.state,
        })

        if (checkUser.state === 'TX') {
            User.inState = true;
        }
    }*/

    const handleClose = () => {
        setValidated(false);
        setShow(false);
        window.location.reload();
    }

    return (
        <div>
            <Container className='profman-padding'>
                <h1 className="title-page">Get a Quote:</h1>
                <Row>
                    <Col md="4"/>
                    <Col style={{"paddingTop":"50px"}}>
                <Form noValidate validated={validated} onSubmit={calcQuote}>
                    {/*Gallon Request*/}
                    <Form.Group controlId='validationGallonReq'>
                     
                        <Row>
                            <Col className='col-auto' style={{"paddingLeft":"40px", "paddingTop":"0.5em"}}>
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
                            <Col md="auto" className="address-box"><p style={{"font-weight":"bold"}}>{delivery_address}</p></Col>
                            <Col style={{"paddingTop":"20px"}}>
                                <Form.Check required
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
                        <Form.Label style={{"paddingLeft":"4.2em", "paddingRight":"0.8em"}}>Delivery Date: </Form.Label>
                        <DatePicker
                            className='delivDatePicker'
                            selected={delivery_date}
                            value={delivery_date}
                            onChange={date => {setDeliveryDate(date)}}
                            minDate={new Date()}
                            showDisabledMonthNavigation
                        />
                        </Col>
                    </Form.Group>

                    <div style={{"paddingLeft":"140px"}}><Button variant='danger' type='submit'>Calculate</Button></div>
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
                        <p>Price per gallon: $ {parseFloat(price_per_gallon.toString()).toFixed(2)}</p>
                        <p>Total cost: $ {(gallons * parseFloat(price_per_gallon.toString())).toFixed(2)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={handleClose}>Get Another Quote</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

export default QuoteForm