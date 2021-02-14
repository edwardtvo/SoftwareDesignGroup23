import {Container, Button, Form, Row, Col} from 'react-bootstrap'




function ProfileManagement() {


  

  return (
    
    <Container fluid className='px-5'>

    

    <h1>Profile Management</h1>

        <Form>
        <Row>
          <Col md="4">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control type="text" required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please enter your full name</Form.Control.Feedback>
          </Col>
        </Row>
        
 
        <Row>
          <Col md="7">
            <Form.Label>Address: </Form.Label>
            <Form.Control type="text"required/>
          </Col>
          <Col sm="3">
            <Form.Label> Address 2 (optional) : </Form.Label>
            <Form.Control type="text" placeholder="Apt no., suite, etc."/>
          </Col>
        </Row>
  
          

        <Row>
          <Col md="3">
          <Form.Label>City: </Form.Label>
          <Form.Control type="text" required/>
          </Col>
        

          <Col md="1">
          <Form.Label>State: </Form.Label>
          <Form.Control as="select">
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
          </Col>

          
          <Col md="2">
          <Form.Label> Zip code: </Form.Label>
          <Form.Control type="text" pattern="[0-9]{5,9}" required/>
          <Form.Control.Feedback type="invalid">Wrong zip code fool</Form.Control.Feedback>
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
