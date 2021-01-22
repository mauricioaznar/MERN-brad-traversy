import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

Navbar.propTypes = {};

function Navbar(props) {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        <li><Link to="/">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;