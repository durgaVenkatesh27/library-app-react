import React, { useState } from 'react';
import * as _ from 'lodash';
import { MaintainLibraryLocale } from '../locale/index';
import ShowTable from './ShowTable';
import '../index.css';
import ErrorAlert from '../commons/ErrorAlert';
import * as api from '../commons/Api';


const Maintain = props => {
    const { userInfo, bookInfo, updateUserData, updateBookData } = props;
    const [selectedUser, setSelectedUser] = useState(-1);
    const [avlBookInfo, setAvlBookInfo] = useState({});
    const [userBookInfo, setUserBookInfo] = useState({});
    const [error, setError] = useState({ isError: false, message: '', severity: 'error' });

    React.useEffect(() => {
        const availableBooks = bookInfo.filter(book => book.isAvailable);
        setAvlBookInfo(availableBooks);

        if (selectedUser !== -1)
            updateUserBookInfo(selectedUser);
    }, [bookInfo, userInfo]);


    const handleChange = (e) => {
        const { target: { value } } = e;
        const errorObj = {
            isError: value === -1 ? true : false,
            message: value === -1 ? _.get(MaintainLibraryLocale, 'notValidToBorrowMsg', '') : '',
            severity: 'error'
        };
        setError(errorObj);
        setSelectedUser(parseInt(value));
        if (!errorObj.isError)
            updateUserBookInfo(value);
    }
    const updateUserBookInfo = (val) => {
        const user = userInfo.find(user => user.id === parseInt(val));
        if (!_.isEmpty(user.bookList)) {
            setUserBookInfo(bookInfo.filter(book => user.bookList.includes(book.id)));
        } else {
            setUserBookInfo([])
        }
    }

    const borrowBook = (e, id) => {
        const errorObj = {
            showMsg: false,
            isError: userBookInfo.length === 2 ? true : false,
            message: userBookInfo.length === 2 ? _.get(MaintainLibraryLocale, 'notValidToBorrowMsg', '') : '',
            severity: 'error'
        };
        if (selectedUser === -1) {
            errorObj.isError = true;
            errorObj.message = _.get(MaintainLibraryLocale, 'userNotAvailable', '');
            errorObj.severity = 'error';
        }
        setError(errorObj);
        if (!errorObj.isError)
            api.updateUserBook(
                `http://localhost:9090/maintain/borrowBook/${selectedUser}/${id}`,
                updateUserData,
                updateBookData,
                setError,
                _.get(MaintainLibraryLocale, 'borrowSuccessMessage', '')
            );
    }

    const returnBook = (e, id) => {
        api.updateUserBook(
            `http://localhost:9090/maintain/returnBook/${selectedUser}/${id}`,
            updateUserData,
            updateBookData,
            setError,
            _.get(MaintainLibraryLocale, 'returnSuccessMessage', '')
        );

    }
    return (
        <div>
            {
                (_.get(error, 'isError', false) || _.get(error, 'showMsg', false))
                && (<ErrorAlert errorMessage={_.get(error, 'message', '')} errorSeverity={_.get(error, 'severity', '')} />)
            }
            <form className="maintain-info">

                <label htmlFor="userNameSelect">
                    {_.get(MaintainLibraryLocale, 'selectUser', '')}
                </label>
                <select
                    className="custom-input custom-select"
                    name="userNameSelect"
                    id="userNameSelect"
                    value={selectedUser}
                    onChange={(e) => handleChange(e)}
                >
                    <option key="-1" value="-1">Select</option>
                    {
                        userInfo.map((row, index) => {
                            return (<option key={index} value={row.id}>{row.name}</option>)
                        })
                    }
                </select>
                {selectedUser !== -1 &&
                    <div>
                        <div className="borrow-list">{_.get(MaintainLibraryLocale, 'returnBookHeader', '')}</div>
                        <ShowTable
                            tableColumn={_.get(MaintainLibraryLocale, 'bookBorrowColumns', '')}
                            tableData={userBookInfo}
                            section='return'
                            functionCall={returnBook}
                        />
                    </div>}
            </form>
            <div>
                <div className="borrow-list">{_.get(MaintainLibraryLocale, 'borrowBookHeader', '')}</div>
                {_.isEmpty(avlBookInfo) ?
                    (<div >{_.get(MaintainLibraryLocale, 'noBooksAvaliable', '')}</div>)
                    : <ShowTable
                        tableColumn={_.get(MaintainLibraryLocale, 'bookBorrowColumns', '')}
                        tableData={avlBookInfo}
                        section='borrow'
                        functionCall={borrowBook}
                    />
                }
            </div>
        </div>
    );
}

export default Maintain;