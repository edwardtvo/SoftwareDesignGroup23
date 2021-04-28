import { Container, Button, Form, Row, Col, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { connect } from 'react-redux'
import * as actions from '../store/actions/index.js'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { withCookies, useCookies } from 'react-cookie';
import './ProfileManagement.css'




function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 100));
}


function ProfileManagement(props,auth) {

  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false)
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [cookie_username, setCookieusername] = useState('');
  const [cookies, setCookie] = useCookies(['user'])
  const [userData, setUserData] = useState({});
  const [modal_show, setModalShow] = useState(false);
  const [modal_show_validation, setModalShowValidation] = useState(false);


  let history=useHistory();

    useEffect(() => {

        // get user info from cookies.user as axios.post
        axios.post('http://localhost:4000/users/current_user', { username: cookies.user })
        .then((res) => {
          if (res.status === 200) {
          setUserData(res.data);
          setCookieusername(cookies.user);
          setUsername(userData.username);
          setFullname(userData.fullname);
          setAddress1(userData.address1);
          setAddress2(userData.address2);
          setCity(userData.city);
          setState(userData.state);
          setZip(userData.zip);
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
      }, [cookies.user, history, isLoading, userData.address1, userData.address2, userData.city, userData.fullname, userData.state, userData.username, userData.zip]);

  //const handleClick = () => setLoading(true);

  const goToGetQuote = () => history.push('/getquote');
  const handleModalClose = () => setModalShow(false);
  const handleModal2Close = () => setModalShowValidation(false);


  const handleRegexValidation = (userObj) => {
    if ( (userObj.fullname.match(/^(.{2,100})$/) != null) &&
        (userObj.address1.match(/^(.{2,200})$/) != null) &&
        (userObj.city.match(/^(.{2,100})$/) != null) &&
        (userObj.state.match(/^([A-Z]{2,2})$/) != null) &&
        (userObj.zip.match(/^([0-9]{5,7})$/) != null) ) 
        {
        console.log('all fields matched validation!')
        return true;
        }
    else 
      return false;

  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(false);
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

    const userObj = {
      cookie_username: cookies.user,
      username: cookies.user,
      fullname: fullname,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip
    }

    console.log(userObj);

      if (handleRegexValidation(userObj)) {
        console.log('handlRegexValidation: true');
          axios.post('http://localhost:4000/users/update', userObj)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
          console.log(error)
          });
          setValidated(true);
          setModalShow(true);
          //history.push("/getquote");
      } else {
        console.log('handlRegexValidation: false');
        setValidated(false);
        setModalShowValidation(true);
      }

    }

  }

  return (
    <div>
    <Container fluid className='profman-padding'>

    <h1 className="title-page">Profile Management</h1>
    <div style={{"paddingTop":"50px"}}/>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md="3"/>
          <Col md="3">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control name="fullname" 
                          type="text"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          required/>
            <Form.Control.Feedback type="invalid">Please enter a real full name</Form.Control.Feedback>
          </Col>
          <Col md="3">
            <Form.Label>Username: </Form.Label>
            <Form.Control name="username"
                          type="text"
                          value={userData.username}
                          onChange={(e) => setUsername(e.target.value)}
                          required/>
            <Form.Control.Feedback type="invalid">Please enter the same username from Registration</Form.Control.Feedback>
          </Col>
        </Row>
        
 
        <Row>

          <Col md="3"/>
          <Col md="4" style={{"paddingTop":"10px"}}>
            <Form.Label>Address: </Form.Label>
            <Form.Control name="address" 
                          type="text" 
                          value={address1}
                          onChange={(e) => setAddress1(e.target.value)}
                          required/>
            <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>

            
          </Col>
          <Col md="2" style={{"paddingTop":"10px"}}>
            <Form.Label> Address 2 (optional) : </Form.Label>
            <Form.Control name="address" 
                          type="text" 
                          value={address2}
                          onChange={(e) => setAddress2(e.target.value)}
                          placeholder="Apt no., suite, etc."/>
          </Col>
        </Row>
  
          

        <Row>
          <Col md="3"/>
          <Col md="2" style={{"paddingTop":"10px"}}>
          <Form.Label>City: </Form.Label>
          <Form.Control name="city" 
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required/>
          <Form.Control.Feedback type="invalid">City is required</Form.Control.Feedback>
          </Col>
        

          <Col md="1" style={{"paddingTop":"10px"}}>
          <Form.Label>State: </Form.Label>
          <Form.Control name = "state" as="select" 
                        value={state} 
                        onChange={(e) => setState(e.target.value)}
                        required>
          <option> </option>
          <option>AL</option><option>AK</option><option>AZ</option>
          <option>AR</option><option>CA</option><option>CO</option>
          <option>CT</option><option>DE</option><option>FL</option>
          <option>GA</option><option>HI</option><option>ID</option>
          <option>IL</option><option>IN</option><option>IA</option>
          <option>KS</option><option>KY</option><option>LA</option>
          <option>ME</option><option>MD</option><option>MA</option>
          <option>MI</option><option>MN</option><option>MS</option>
          <option>MO</option><option>MT</option><option>NE</option>
          <option>NV</option><option>NH</option><option>NJ</option>
          <option>NM</option><option>NY</option><option>NC</option>
          <option>ND</option><option>OH</option><option>OK</option>
          <option>OR</option><option>PA</option><option>RI</option>
          <option>SC</option><option>SD</option><option>TN</option>
          <option>TX</option><option>UT</option><option>VT</option>
          <option>VA</option><option>WA</option><option>WV</option>
          <option>WI</option><option>WY</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">Please select a state</Form.Control.Feedback>

          </Col>

          
          <Col md="1" style={{"paddingTop":"10px"}}>
          <Form.Label> Zip code: </Form.Label>
          <Form.Control name="zip" 
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        type="text" 
                        required/>
          <Form.Control.Feedback type="invalid">Please enter a valid zip code</Form.Control.Feedback>
          </Col>
        </Row>
            


        <br />

        {/* figure out validation before submitting */}
      <Row><Col md="5"/><Col md="2" style={{"paddingTop":"1em"}}><Button variant="danger" type="submit">Submit</Button></Col></Row>

              {/*disabled={isLoading} 
              onClick={!isLoading ? handleClick : null}
              href="/quoteform">
                {isLoading ? 'Submitting..' : 'Submit'}</Button>{' '}*/}
        

        


        
        </Form>
      

    </Container>

                <Modal
                    show={modal_show}
                    onHide={(e) => handleModalClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Profiled Updated!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <t2>Your profile information has been updated</t2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={() => goToGetQuote()}>Go to Get Quote</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={modal_show_validation}
                    /* onHide={(handleModalClose)} */>
                    <Modal.Header closeButton>
                        <Modal.Title>Invalid Inputs!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <t2>Full name must be between 2 and 100 characters</t2><br/>
                        <t2>Address1 must be between 2 and 200 characters</t2><br/>
                        <t2>City must be between 2 and 100 characters</t2><br/>
                        <t2>One state must be selected</t2><br/>
                        <t2>Zip code must be between 5 and 7 numbers</t2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={() => handleModal2Close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
    </div>
  );
}


export default ProfileManagement;
