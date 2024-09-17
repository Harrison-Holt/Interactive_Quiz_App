import React from 'react'; 
import { Row, Col } from 'react-bootstrap'; 
import './header.css'; 

function Header() {
    return (
        <Row as="header">
            <Col md={6} className="d-flex justify-content-start align-items-center p-3">
            <h1 className="ms-2">Interactive Quiz Game</h1>
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center p-3">
            <a href="https://harrisonholt.dev/" className='btn btn-secondary'>Home Page</a>
            </Col>
        </Row>
    ); 
}

export default Header; 
