const [showResults, setShowResults] = useState(false)
    const onClick = () => setShowResults(true)
    const [isButtonDisabled, disableButton] = useState(false)
    const [isContainerDisabled, disableContainer] = useState(false)

    const handleClick = () => {
    
        disableButton(true);
    }



<Container className="appjs-padding" 
                    disabled={isButtonDisabled} 
                    style={{display: isButtonDisabled ? "none" : "block"}}>
            <Row>
                <Col md="3"></Col>
                <Col md="auto">
                    <h1 className="title-page"
                        style={{display: isButtonDisabled ? "none" : "block"}}
                    >Welcome to COUGAR GAS INC.!</h1>
                </Col>
                <Col md="5"></Col>
            </Row>            
            <Row className="appjs-button-padding">
                <Col md="5"></Col>
                <Col md="auto">    
                    <Button variant="danger" href="/login"
                    style={{display: isButtonDisabled ? "none" : "block"}} 
                    disabled={isButtonDisabled} 
                    onClick={handleClick}>Log in</Button>{' '}
                </Col>
                <Col md="auto">    
                    <Button variant="light" href="/Registration">Sign up</Button>{' '}
                </Col>
                <Col></Col>
            </Row>
        </Container>
