import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

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
              ? <Link to="/edit-profile" classNmae>Edit profile</Link>
              : null
            }
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
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