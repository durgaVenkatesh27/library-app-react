import * as _ from 'lodash';

const addUser = (url, setUserName, param, locale, setAlert) => {
  fetch(url, {
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    },
    "body": JSON.stringify(param)
  })
    .then(response => response.json())
    .then(response => {
      setUserName("");
      setAlert({
        showMsg: true,
        message: _.get(locale, 'successMessage', ''),
        severity: "success"
      });
    })
    .catch(err => {
      setAlert({
        showMsg: true,
        message: 'Somthing went Wrong',
        severity: "error"
      });
      console.log(err);
    });
}

const getUserData = (url, updateUserInfo) => {
  fetch(url, {
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      updateUserInfo(response);
    })
    .catch(err => {
      console.log(err);
    });
}

const updateUserBook = (url, updateUserData,
  updateBookData, setError, msg) => {
  fetch(url, {
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    }
  })
    .then(response => {
      updateUserData();
      updateBookData();
      setError({
        showMsg: true,
        message: msg,
        severity: "success"
      });
    })
    .catch(err => {
      setError({
        showMsg: true,
        message: 'Somthing went Wrong',
        severity: "error"
      });
      console.log(err);
    });
}
export { addUser, getUserData, updateUserBook }