import React from 'react';
import { Row, Col } from 'react-bootstrap'; 
import './footer.css';

function Footer() {
    return (
        <Row as="footer">
            <Col md={6} className="d-flex flex-row justify-content-end align-items-center p-3">
            <h2>Let's Connect!</h2>
            </Col>
            <Col md={6} className="d-flex flex-row justify-content-start align-items-center gap-3 mb-2 p-3">
            <a href="https://github.com/Harrison-Holt" className="icon-link" aria-label="Visit Harrison's GitHub profile" title="Visit Harrison's GitHub profile">
                <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/harrison-holt-18a703202" className="icon-link" aria-label="Visit Harrison's LinkedIn profile" title="Visit Harrison's LinkedIn profile">
                <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:hholt2901@gmail.com" className="icon-link email-icon" aria-label="Send an email to Harrison" title="Send an email to Harrison">
                <i className="fa fa-envelope"></i>
            </a>
            </Col>
        </Row>
    );
}

export default Footer;

