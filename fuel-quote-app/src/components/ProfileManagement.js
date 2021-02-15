import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import { useState } from 'react'




function ProfileManagement() {

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
    
    <Container fluid className='px-5'>

    

    <h1>Profile Management</h1>

        <Form>
        <Row>
          <Col md="4">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control name="fullname" 
                          pattern="[A-Za-z0-9'\.\-\s]{0,100}$" 
                          type="text"
                          required/>
            <Form.Control.Feedback type="invalid">Please enter a real full name</Form.Control.Feedback>
          </Col>
        </Row>
        
 
        <Row>
          <Col md="7">
            <Form.Label>Address: </Form.Label>
            <Form.Control name="address" type="text" pattern="^[A-Za-z0-9'\.\-\s\,#\:\/]{0,100}$" required/>
            <Form.Control.Feedback type="invalid">Address is required</Form.Control.Feedback>

            
          </Col>
          <Col sm="3">
            <Form.Label> Address 2 (optional) : </Form.Label>
            <Form.Control name="address" type="text" placeholder="Apt no., suite, etc."/>
          </Col>
        </Row>
  
          

        <Row>
          <Col md="3">
          <Form.Label>City: </Form.Label>
          <Form.Control name="city" type="text" patttern="[A-Za-z]{1,100}" required/>
          <Form.Control.Feedback type="invalid">City is required</Form.Control.Feedback>
          </Col>
        

          <Col md="1">
          <Form.Label>State: </Form.Label>
          <Form.Control name = "state" as="select">
          <option value=''> </option>
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

          
          <Col md="2">
          <Form.Label> Zip code: </Form.Label>
          <Form.Control name="zip" type="text" required/>
          <Form.Control.Feedback type="invalid">Please enter a valid zip code</Form.Control.Feedback>
          </Col>
        </Row>
            


        <br />
      <Button variant="primary" type="submit">Submit</Button>{' '}
        

        


        
        </Form>
      

    </Container>
  );
}

const styles = {
  horizontalForm: {
    paddingLeft: "2em",
  }
}


export default ProfileManagement;
