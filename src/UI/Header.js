import React from 'react'; 
import { Row, Col } from 'react-bootstrap'; 
import './header.css'; 

function Header() {
    return (
        <Row as="header">
            <Col className="d-flex flex-row justifty-content-between align-items-center">
            <h1 className="ms-2">Interactive Quiz Game</h1>
            <a href="https://harrisonholt.dev/" className='btn btn-secondary'>Home Page</a>
            </Col>
        </Row>
    ); 
}

export default Header; 
