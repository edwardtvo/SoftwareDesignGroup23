import {Container, Row, Col} from 'react-bootstrap'
import NavBar from './NavBar'
import cougar_gas from '../images/cougar-gas.png'

const Home = () => {
    return (
        <>
        <Container style={{"paddingTop":"100px"}}>
            
                    <div style={{"alignContent":"center"}}>
                        <img src={cougar_gas} alt="Cougar Gas Logo"/>
                    </div>
                    <h1 className="title-page" style={{"paddingBottom":"0.6em"}}>Welcome to COUGAR GAS INC.!</h1>
                    <Row>
                        <Col md="3"/>
                        <Col>
                        <t3 style={{"alignContent":"center"}}>Click an option on the Navigation Bar above to navigate to a page</t3> <br/>
                        <t3 style={{"alignText":"center"}}>Go to <a href='/profilemanagement' style={{"color":"red"}}>Profile Management</a> if you haven't set up your profile</t3>
                        </Col>
                        <Col md="auto"></Col>
                    </Row>
            
        </Container>
        </>
    )
}

export default Home
