import React from 'react';
import './header.css'; 

function Header() {
    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
            <a style={link_style} href="https://personal-blog-website-kappa.vercel.app/">Home Page</a>
            </nav>
        </header>
    );
}
const link_style = {
    fontSize: '24px', 
    color: 'white', 
    textDecoration: "none"
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    width: '100%',
    top: 0, 
    left: 0, 
    zIndex: 1000, 
}

const navStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%', 
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px', // Add some space between links
}

export default Header;
