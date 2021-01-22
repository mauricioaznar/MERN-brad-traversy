import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

Landing.propTypes = {
  
};

function Landing(props) {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-primary"
            >Sign Up</Link>
            <a
              to="/login"
              className="btn btn-light"
            >Login</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;