import logo from './logo.svg';
import Header from './components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {


  return (
    
    <Container fluid>


      <Header title='Profile Management'/>
      <Form>

          <Form.Label>Full Name: </Form.Label>
          <Form.Control type="text"/>
          <br />

          <Form.Label>Address: </Form.Label>
          <Form.Control type="text"/>

          <Form.Label style={styles.horizontalForm}> Address 2 (optional) : </Form.Label>
          <Form.Control type="text"/>
          <br />

          <Form.Label>City: </Form.Label>
          <Form.Control type="text"/>

          <Form.Label style={styles.horizontalForm}> Zip code: </Form.Label>
          <Form.Control type="text"/>
          <br />

          <Form.Label>State: </Form.Label>
          <Form.Control as="select">
          <option>1st US state</option>
          <option>50th US state</option>
          </Form.Control>
            





      </Form>

      <br />
      <Button variant="primary">Submit</Button>{' '}

    


    </Container>
  );
}

const styles = {
  horizontalForm: {
    paddingLeft: "2em",
  }
}



export default App;
