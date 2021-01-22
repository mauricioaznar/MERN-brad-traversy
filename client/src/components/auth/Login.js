import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

Login.propTypes = {

};

function Login(props) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('SUCCESS')
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into your Account</p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Login"
        />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign In</Link>
      </p>
    </React.Fragment>
  );
}

export default Login;