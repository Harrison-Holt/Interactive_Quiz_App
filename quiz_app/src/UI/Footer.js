import React from 'react';

function Footer() {
    return (
        <footer style={footerStyle}>
            <p style={textStyle}>Last Updated March 13, 2024</p>
        </footer>
    ); 
}

const footerStyle = {
    display: 'flex', // Use flexbox to center content
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    background: '#333', 
    color: '#fff', 
    textAlign: 'center', 
    padding: '10px',
    position: 'sticky', // Keep the footer at the bottom
    left: '0',
    bottom: '0',
    width: '100%', // Full width
}

const textStyle = {
    fontFamily: 'Times New Roman',
    padding: '10px'
}

export default Footer;

