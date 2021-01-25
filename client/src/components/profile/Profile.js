import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";

const Profile = (props) => {
  const {match, getProfileById, profile: {profile, loading}, auth} = props

  React.useEffect(() => {
   getProfileById(match.params.id)
  }, [getProfileById])

  return (
    <React.Fragment>
      {
        profile === null || loading
          ? <Spinner />
          : <React.Fragment>
            <Link to='/profiles' className="btn btn-ligh">
              Back To profiles
            </Link>
            {
              auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id
              ? <Link to="/edit-profile">Edit profile</Link>
              : null
            }
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h1 className="text-primary">
                  Experience
                </h1>
                {
                  profile.experience.length > 0
                    ? <React.Fragment>
                      {
                        profile.experience.map(experience => {
                          return <ProfileExperience
                            key={experience._id}
                            experience={experience}
                          />
                        })
                      }
                    </React.Fragment>
                    : <h4>No experience credentials</h4>
                }
              </div>
              <div className="profile-edu bg-white p-2">
                <h1 className="text-primary">
                  Education
                </h1>
                {
                  profile.education.length > 0
                    ? <React.Fragment>
                      {
                        profile.education.map(education => {
                          return <ProfileEducation
                            key={education._id}
                            education={education}
                          />
                        })
                      }
                    </React.Fragment>
                    : <h4>No experience credentials</h4>
                }
              </div>
              {
                profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} />
                )
              }
            </div>
          </React.Fragment>
      }
    </React.Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getProfileById})(Profile);