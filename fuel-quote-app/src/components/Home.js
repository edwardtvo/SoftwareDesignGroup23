import {Container, Row, Col} from 'react-bootstrap'
import NavBar from './NavBar'

const Home = () => {
    return (
        <>
        <NavBar loggedIn={true}/>
        <Container className="appjs-padding">
            
                    <h1 className="title-page">Welcome to COUGAR GAS INC.!</h1>
                
                      
              
                    <h1 className="home-text">Click an option on the Navigation Bar above to navigate to a page</h1>
                
            
        </Container>
        </>
    )
}

export default Home
