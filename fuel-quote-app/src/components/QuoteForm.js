import {Container, Button, Form, Row, Col} from 'react-bootstrap'
import {useState} from 'react'
import DatePicker from 'react-datepicker'
import QuoteCalcResult from './QuoteCalcResult'

require('react-datepicker/dist/react-datepicker.css')

const QuoteForm = () => {
    /*
    Form Validation https://react-bootstrap.netlify.app/components/forms/#forms-validation-input-group
    handleSubmit function checks that al required fields contain valid input
    Form.Control>Feedback prompts user to correct info if necessary
    Cannot submit form without validation
    */
    const [validated, setValidated] = useState(false)
    const [gallons, setGallons] = useState(1)
    const price_per_gal = useState(10.50)
    const [showCalc, setShowCalc] = useState(false)

    const calcQuote = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        setShowCalc(true)
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

                <Button variant='primary' type='submit'>Calculate</Button>
            </Form>

            {showCalc && <QuoteCalcResult perGal={parseFloat(price_per_gal.toString()).toFixed(2)} total={(gallons*parseFloat(price_per_gal.toString())).toFixed(2)} />}

        </Container>
    )
}

export default QuoteForm