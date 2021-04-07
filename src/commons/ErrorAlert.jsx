import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import '../index.css';

const ErrorAlert = ({ errorMessage, errorSeverity }) => (
  <Alert severity={errorSeverity} className="custom-alert">{errorMessage}</Alert>
);

ErrorAlert.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

ErrorAlert.defaultProps = {
  errorMessage: '',
  errorSeverity: 'error'
};
export default ErrorAlert;