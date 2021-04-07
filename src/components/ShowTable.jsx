import React from 'react';
import * as _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MaintainLibraryLocale } from '../locale';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "cornflowerblue",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const ShowTable = props => {
  const { tableColumn, tableData, section, functionCall } = props;

  return (
    <div>
      <TableContainer component={Paper} >
        <Table aria-label="customized table" className={section}>
          <TableHead>
            <TableRow>
              {
                tableColumn.map((column, index) => (
                  <StyledTableCell
                    key={index}
                    align={"center"}
                    id={`${column}ColumnHeader`}
                  > {column}</StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {_.isEmpty(tableData) ? " No data " : tableData.map((row, index) => (

              section === 'user' ? (
                <StyledTableRow key={row.id} id="tableBody">
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.bookList}</StyledTableCell>
                </StyledTableRow>)
                : (section === 'book' ?
                  (<StyledTableRow key={row.id} id="tableBody">
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.bookTitle}</StyledTableCell>
                  </StyledTableRow>)
                  : (section === 'borrow' ? (<StyledTableRow key={row.id} id="tableBody">
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.bookTitle}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{ 'text-transform': 'none' }}
                        type="button"
                        className={`borrow${index} primary`}
                        onClick={(e) => functionCall(e, row.id)}
                        id={`borrow${index}`}
                      >
                        {_.get(MaintainLibraryLocale, 'borrowButtonTxt', '')}
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>)
                    : (<StyledTableRow key={row.id} id="tableBody">
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell align="center">{row.bookTitle}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          style={{ 'text-transform': 'none' }}
                          type="button"
                          onClick={(e) => functionCall(e, row.id)}
                          id={`borrowList${index}`}
                        >
                          {_.get(MaintainLibraryLocale, 'returnButtonTxt', '')}
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>)

                  ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


export default ShowTable;