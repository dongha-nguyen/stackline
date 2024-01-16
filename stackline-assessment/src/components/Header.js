import React from 'react';
import LogoSVG from '../assets/stackline_logo.svg'; 
import '../styles/Header.css'; // Import your CSS file

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={LogoSVG} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;