import React, { useState } from 'react';
import * as _ from 'lodash';
import { UserInfoLocale } from '../locale/index';
import ShowTable from './ShowTable';
import '../index.css';
import * as api from '../commons/Api';
import ErrorAlert from '../commons/ErrorAlert';


const User = props => {
  const { userInfo, updateUserData } = props;
  const [userName, setUserName] = useState('');
  const [alert, setAlert] = useState({ showMsg: false, message: '', severity: 'error' })

  const handleChange = (e) => {
    const { target: { value } } = e;
    alert.showMsg = false;
    setAlert(alert);
    setUserName(value);
  }

  const addUserInfo = (e) => {
    e.preventDefault();
    api.addUser(
      "http://localhost:9090/user/addUser",
      setUserName,
      { "name": userName },
      UserInfoLocale, setAlert);
    updateUserData();
  }

  return (
    <div>
      {
        _.get(alert, 'showMsg', false)
        && (<ErrorAlert errorMessage={_.get(alert, 'message', '')} errorSeverity={_.get(alert, 'severity', '')} />)
      }
      <form className="maintain-info">


        <label htmlFor="userName">
          {_.get(UserInfoLocale, 'userName', '')}
        </label>
        <input
          className="custom-input"
          type="text"
          name="userName"
          id="userName"
          value={userName}
          autoComplete='off'
          onChange={(e) => handleChange(e)}
        />
        <button
          className="custom-button"
          id="addUser"
          type="submit"
          disabled={userName.length === 0}
          onClick={(e) => addUserInfo(e)}
        >
          {_.get(UserInfoLocale, 'addButtonTxt', '')}
        </button>
      </form>
      <div>
        <ShowTable
          tableColumn={_.get(UserInfoLocale, 'userTableColumns', '')}
          tableData={userInfo}
          section='user'
        />
      </div>
    </div>
  );
}

export default User;