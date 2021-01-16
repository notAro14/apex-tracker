import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-element">
        <Link className="link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar-element">
        <Link className="link" to="/installation">
          Installation
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
