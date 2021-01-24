import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {createProfile} from "../../actions/profile";

const CreateProfile = props => {
  const [formData, setFormData] = React.useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })

  const [displaySocialInputs, toggleSocialInputs] = React.useState(false)

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    props.createProfile(formData, props.history)
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form"
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <select
            value={status}
            onChange={onChange}
            name="status"
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small
            className="form-text"
          >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input
            value={company}
            onChange={onChange}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small
            className="form-text"
          >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input
            value={website}
            onChange={onChange}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small
            className="form-text"
          >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input
            value={location}
            onChange={onChange}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small
            className="form-text"
          >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input
            value={skills}
            onChange={onChange}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small
            className="form-text"
          >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            value={githubusername}
            onChange={onChange}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small
            className="form-text"
          >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={onChange}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        {
          displaySocialInputs && <React.Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                value={twitter}
                onChange={onChange}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                value={facebook}
                onChange={onChange}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                value={youtube}
                onChange={onChange}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                value={linkedin}
                onChange={onChange}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                value={instagram}
                onChange={onChange}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </React.Fragment>
        }
        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
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
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};


export default connect(null, {createProfile})(withRouter(CreateProfile));