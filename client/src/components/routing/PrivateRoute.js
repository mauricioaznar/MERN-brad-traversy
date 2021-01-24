import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

function PrivateRoute({ component: Component, ...rest }) {
  return <Route
    {...rest}
    render={
      props => !rest.auth.isAuthenticated && !rest.auth.loading
        ? <Redirect to="/login" />
        : <Component {...props} />
    }
  />
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);