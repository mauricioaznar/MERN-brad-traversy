import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {getCurrentProfile} from "../../actions/profile";
import Spinner from '../layout/Spinner'
import {Link} from "react-router-dom";


Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

function Dashboard(props) {

  React.useEffect(() => {
    props.getCurrentProfile()
  }, [])

  return (
    props.auth.loading && props.profile === null
      ? <Spinner/>
      : <React.Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {props.profile.user && props.profile.user.name}
        </p>
        {!!props.profile.profile
          ? <React.Fragment>
            has
            </React.Fragment>
          : <React.Fragment>
              You have not yet setup a profile, please add some info
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </React.Fragment>
        }
      </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);