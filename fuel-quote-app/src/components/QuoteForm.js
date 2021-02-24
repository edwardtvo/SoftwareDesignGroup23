import {Container, Button, Form, Row, Col, Modal} from 'react-bootstrap'
import {useState} from 'react'
import DatePicker from 'react-datepicker'

require('react-datepicker/dist/react-datepicker.css')

const QuoteForm = () => {
    /*
    Form Validation https://react-bootstrap.netlify.app/components/forms/#forms-validation-input-group
    handleSubmit function checks that al required fields contain valid input
    Form.Control.Feedback prompts user to correct info if necessary
    Cannot submit form without validation
    To fix immediate refresh on click/submit https://github.com/react-bootstrap/react-bootstrap/issues/1510
    */
    const [validated, setValidated] = useState(false)
    const [gallons, setGallons] = useState(0)
    const price_per_gal = useState(1.50)
    const [show, setShow] = useState(false)

    const calcQuote = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        setShow(true)

        return false
    }

    const handleClose = () => {
        setShow(false)
        setValidated(false)
    }

    /*
    Delivery Date validated using react-datepicker DatePicker
    https://reactdatepicker.com/
    https://github.com/Hacker0x01/react-datepicker/issues/879
    */
    const [startDate, setStartDate] = useState(new Date())

    return (
        <Container fluid className='px-5'>
            <h1>Get a Quote:</h1>
            <Form noValidate validated={validated} onSubmit={calcQuote}>
                {/*Gallon Request*/}
                <Form.Group controlId='validationGallonReq'>
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
                                          onChange={(e) => setGallons(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Please provide a valid number</Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>

                {/*Verify Address*/}
                <Form.Group controlId='validationAddress'>
                    <Row>
                        <Col className='col-auto'><p>[This will be the delivery address]</p></Col>
                        <Col>
                            <Form.Check required
                                         type='checkbox'
                                         label='Delivery Address Verified'
                                         feedback='Please verify address'
                        />
                        </Col>
                    </Row>
                </Form.Group>

                {/*Delivery Date*/}
                <Form.Group>
                    <Form.Label>Delivery Date: </Form.Label>
                    <DatePicker
                        className='delivDatePicker'
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                    />
                </Form.Group>

                <Button variant='primary' onClick={calcQuote}>Calculate</Button>
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
                    <p>Price per gallon: $ {parseFloat(price_per_gal.toString()).toFixed(2)}</p>
                    <p>Total cost: $ {(gallons*parseFloat(price_per_gal.toString())).toFixed(2)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit'>Get Another Quote</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default QuoteForm