import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addEducation} from '../../actions/profile'

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

function AddEducation(props) {

  const [formData, setFormData] = React.useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = React.useState(false)

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault()
        props.addEducation(formData, props.history)
      }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or bootcamp"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or certificate"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of study"
            value={fieldofstudy}
            onChange={onChange}
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={onChange}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <p><input
            type="checkbox"
            name="current"
            value={current}
            checked={current}
            onChange={e => {
              setFormData({...formData, current: !current})
              toggleDisabled(!toDateDisabled)
            }}
          /> Current School</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
        />
        <a
          className="btn btn-light my-1"
          href="dashboard.html"
        >Go Back</a>
      </form>
    </React.Fragment>
  );
}

export default connect(null, {addEducation})(withRouter(AddEducation));
