import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from '../components/Home';
import * as mapDispatchToProps from '../actions/index';
import '../index';

class LibraryAppContainer extends Component {

  render() {
    const { libraryApp: { userInfo, bookInfo }, updateUserInfo, updateBookInfo } = this.props;
    return (
      <div className="library-app-wrapper">
        <Home
          updateUserInfo={updateUserInfo}
          updateBookInfo={updateBookInfo}
          userInfo={userInfo}
          bookInfo={bookInfo}
        />

      </div>
    )
  }
}

const mapStateToProps = ({ libraryApp }) => {
  return ({
    libraryApp
  })
}

LibraryAppContainer.propTypes = {
  libraryApp: PropTypes.object.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  updateBookInfo: PropTypes.func.isRequired,
};

LibraryAppContainer.defaultProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(LibraryAppContainer);
