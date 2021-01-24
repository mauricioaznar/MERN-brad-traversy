import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from "../layout/Spinner";
import {getProfiles} from '../../actions/profile'
import ProfileItem from "./ProfileItem";

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

function Profiles(props) {
  const {getProfiles, profile: {profiles,  loading}} = props

  React.useEffect(() => {
    getProfiles()
  }, [getProfiles])


  return (
    <React.Fragment>
      {
        loading ? <Spinner /> : <React.Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Browse and connect with developers
          </p>
          <div className="profiles">
            {
              profiles.length > 0
                ? (
                  profiles.map(profile => {
                    return <ProfileItem key={profile._id} profile={profile}/>
                  })
                )
                : <h4>No profiles found</h4>
            }
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);