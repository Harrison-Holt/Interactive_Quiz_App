import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <a href="https://personal-blog-website-kappa.vercel.app/" style="font-size:24px;">Home Page</a>
            </nav>
        </header>
    );
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed', // Keep the header at the top
    width: '100%', // Full width
    top: 0, // Align to the top
    left: 0, // Align to the left
    zIndex: 1000, // Ensure it's above other content
}

const navStyle = {
    display: 'flex',
    justifyContent: 'center', // Center the links horizontally
    alignItems: 'center', // Align the links vertically
    height: '100%', // Fill the header height
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px', // Add some space between links
}

export default Header;
