import React from 'react'; 
import './header.css'; 

function Header() {
    return (
        <header style={Header_Style}>
            <h1>Interactive Quiz Game</h1>
            <a href="https://personal-blog-website-kappa.vercel.app/">Home Page</a>
        </header>
    ); 
}

const Header_Style = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: '15px', 
    width: '100%', 
    position: 'sticky', 
    zIndex: '1000', 
    margin: '0', 
    top: '0', 
    left: '0',
    backgroundColor: '#4a76a8', 
    color: 'white',
}

export default Header; 
