import {Container, Row, Col} from 'react-bootstrap'
import NavBar from './NavBar'

const Home = () => {
    return (
        <>
        <NavBar loggedIn={true}/>
        <Container className="appjs-padding">
            
                    <h1 className="title-page">Welcome to COUGAR GAS INC.!</h1>
                
                      
              
                    <h1 className="home-text">Click an option on the Navigation Bar above to navigate to a page</h1>
                    <h2 className="home-text">Go to "Profile Management if you haven't set up your profile</h2>
                
            
        </Container>
        </>
    )
}

export default Home
