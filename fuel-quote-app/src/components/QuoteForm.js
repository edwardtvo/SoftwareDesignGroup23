import {Button, Form, Row, Col} from 'react-bootstrap'
import {useState} from 'react'
const QuoteForm = () => {
    /*
    Form Validation https://react-bootstrap.netlify.app/components/forms/#forms-validation-input-group
    handleSubmit function checks that al required fields contain valid input
    Form.Control>Feedback prompts user to correct info if necessary
    Cannot submit form without validation
    */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
    }
    return (
        <div>
            <h1>Get a Quote:</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/*Gallon Request*/}
                <Form.Group controlId='validationGallonReq'>
                    <Form.Label>Gallons Requested:</Form.Label>
                    <Form.Control required type='number' placeholder='0' />
                    <Form.Control.Feedback type='invalid'>Please provide a valid number</Form.Control.Feedback>
                </Form.Group>

                {/*Verify Address*/}
                <Form.Group controlId='validationAddress'>
                    <Row>
                    <Col><p>[This will be the delivery address]</p></Col>
                    <Col><Form.Check required type='checkbox' label='Delivery Address Verified' feedback='Please verify address'/></Col>
                    </Row>
                </Form.Group>

                {/*Delivery Date*/}
                <Form.Group controlId='validationDelivDate'>
                    <Form.Label>Delivery Date: </Form.Label>
                    <Form.Control required type='date' />
                    <Form.Control.Feedback type='invalid'>Please select a delivery date</Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit'>Calculate</Button>
            </Form>
        </div>
    )
}

export default QuoteForm