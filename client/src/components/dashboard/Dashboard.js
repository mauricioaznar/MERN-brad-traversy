import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {getCurrentProfile} from "../../actions/profile";
import Spinner from '../layout/Spinner'
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import {deleteAccount} from "../../actions/profile";
import Experience from "./Experience";
import Education from "./Education";

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
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
            <DashboardActions/>
            <Experience experience={props.profile.profile.experience}/>
            <Education education={props.profile.profile.education}/>
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                    props.deleteAccount()
                  }
                }
              >
                <i className="fa fa-user-minus">

                </i>
                Delete Account
              </button>
            </div>
          </React.Fragment>
          : <React.Fragment>
            You have not yet setup a profile, please add some info
            <Link
              to="/create-profile"
              className="btn btn-primary my-1"
            >
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

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);