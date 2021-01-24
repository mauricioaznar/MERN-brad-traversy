import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

function Alert({alerts}) {
  return alerts !== null && alerts.length > 0 && alerts.map(alert => {
    return (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    )
  })
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alert
  }
}

export default connect(mapStateToProps, null)(Alert);