import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {setAlert} from "../../actions/alert";

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

function Register(props) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== password2) {
      props.setAlert('Password do not match', 'danger', 2000)
    } else {
      console.log('SUCCESS')
    }
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small
            className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Register"
        />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/Login">Log in</Link>
      </p>
    </React.Fragment>
  );
}

export default connect(null, {setAlert})(Register);