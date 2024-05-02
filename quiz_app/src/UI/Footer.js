import React from 'react';
import './footer.css';

function Footer() {

    const footerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        backgroundColor: '#4a76a8',
        color: 'white',
        textAlign: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        marginTop: '40px'
    };
    
    const headerStyle = {
        marginRight: '20px',
        fontSize: '24px',
    };
    
    const iconStyle = {
        fontSize: '24px',
        textDecoration: 'none',
        color: 'inherit',
        marginRight: '20px',
    };
    
    const emailIconStyle = {
        ...iconStyle,
        marginRight: '0',
    };

    return (
        <footer style={footerStyles}>
            <h1 style={headerStyle}>Let's Connect!</h1>
            <a href="https://github.com/Harrison-Holt" className="icon-link" aria-label="Visit Harrison's GitHub profile" title="Visit Harrison's GitHub profile">
                <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/harrison-holt-18a703202" className="icon-link" aria-label="Visit Harrison's LinkedIn profile" title="Visit Harrison's LinkedIn profile">
                <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:hholt2901@gmail.com" className="icon-link email-icon" aria-label="Send an email to Harrison" title="Send an email to Harrison">
                <i className="fa fa-envelope"></i>
            </a>
        </footer>
    );
}

export default Footer;

