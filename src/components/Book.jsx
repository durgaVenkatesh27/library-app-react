import React, { useState } from 'react';
import * as _ from 'lodash';
import { BookInfoLocale } from '../locale/index';
import * as api from '../commons/Api';
import ShowTable from './ShowTable';
import '../index.css';
import ErrorAlert from '../commons/ErrorAlert';


const Book = props => {
  const { bookInfo, updateBookData } = props;
  const [bookName, setBookName] = useState('');
  const [alert, setAlert] = useState({ showMsg: false, message: '', severity: 'error' })

  const handleChange = (e) => {
    const { target: { value } } = e;
    alert.showMsg = false;
    setAlert(alert);
    setBookName(value);
  }

  const addBookInfo = (e) => {
    e.preventDefault();

    api.addUser(
      "http://localhost:9090/library/addBooks",
      setBookName,
      { "bookTitle": bookName, "isAvailable": true },
      BookInfoLocale,
      setAlert
    );
    updateBookData();
  }
  return (
    <div>
      {
        _.get(alert, 'showMsg', false)
        && (<ErrorAlert errorMessage={_.get(alert, 'message', '')} errorSeverity={_.get(alert, 'severity', '')} />)
      }
      <form className="maintain-info">
        <label htmlFor="bookName">
          {_.get(BookInfoLocale, 'bookName', '')}
        </label>
        <input
          className="custom-input"
          type="text"
          name="bookName"
          id="bookName"
          value={bookName}
          autoComplete='off'
          onChange={(e) => handleChange(e)}
        />
        <button
          className="custom-button"
          type="submit"
          disabled={bookName.length === 0}
          onClick={(e) => addBookInfo(e)}
          id="addBook"
        >
          {_.get(BookInfoLocale, 'addButtonTxt', '')}
        </button>
      </form>
      <div>
        <ShowTable
          tableColumn={_.get(BookInfoLocale, 'bookTableColumns', '')}
          tableData={bookInfo}
          section='book'
        />
      </div>
    </div>
  );
}

export default Book;