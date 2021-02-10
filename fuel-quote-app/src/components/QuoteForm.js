import {Button, Form} from 'react-bootstrap'
const QuoteForm = () => {
    return (
        <div>
            <h1>Get a Quote:</h1>
            <Form>
                {/*Gallon Request*/}
                <Form.Group>
                    <Form.Label>Gallons Requested:</Form.Label>
                    <Form.Control type='number' placeholder='0' />
                </Form.Group>

                {/*Verify Address*/}
                <Form.Group>
                    <p>[This will be the delivery address]</p>
                    <Form.Check type='checkbox' label='Delivery Address Verified'/>
                </Form.Group>

                {/*Delivery Date*/}
                <Form.Group>
                    <Form.Label>Delivery Date: </Form.Label>
                    <Form.Control type='date' />
                </Form.Group>

                <Button variant='primary' type='submit'>Calculate</Button>
            </Form>
        </div>
    )
}

export default QuoteForm