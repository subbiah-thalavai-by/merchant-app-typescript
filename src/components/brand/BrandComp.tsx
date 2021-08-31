/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  makeStyles, withStyles, useTheme, Theme, createStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Typography,
  Paper,
  Box,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TableFooter from '@material-ui/core/TableFooter';
import { AuthContext } from '../../context/AuthContext';
import propertiesfile from '../../resource.json';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  box: {
    height: 50,
    display: 'flex',
    border: '1px solid black',
    padding: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pageTitle: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    fontSize: '24px',
    // marginTop:'15px',
    // paddingBottom:'15px'
  },
}));

interface IBrand {
    id: string;
    title: string;
    description: string;
}

const defaultBrand: IBrand[] = [];

// pagination code start
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#24384C',
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

const useStyles1 = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange,
  } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  // pagination code end
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
// pagination code end

const BrandComp: React.FC = () => {
  const [brands, setBrands]: [IBrand[], (Brand: IBrand[]) => void] = React.useState(defaultBrand);
  // const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  // const [error, setError]: [string, (error: string) => void] = React.useState('');
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, brands.length - page * rowsPerPage);

  const user = useContext(AuthContext);
  console.log(user);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const redirect = () => {
    history.push('/brand/create');
  };

  useEffect(() => {
    axios
      .get<IBrand[]>(`${process.env.REACT_APP_BASE_URL}brands`)
      .then((response) => {
        setBrands(response.data);
        console.log(response.data);
        // setLoading(false);
      })
      .catch((ex) => {
        // const error = ex.response.status === 404
        //   ? 'Resource Not found'
        //   : 'An unexpected error has occurred';
        // setError(error);
        // setLoading(false);
      });
  }, []);

  return (
    <>
      <Box display="flex" pb={2}>
        <Box flexGrow={1}>
          <Typography component="div" className={classes.pageTitle}>
            {propertiesfile.title_brand_list}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={redirect}
          >
            {propertiesfile.button_add}
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{propertiesfile.title}</StyledTableCell>
              <StyledTableCell>{propertiesfile.description}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow key={row.title}>
                <TableCell>
                  <a href={`/#/brands/${row.id}`}>
                    {' '}
                    {row.title}
                    {' '}
                  </a>
                  {' '}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                {/* <TableCell >{categoryName(row.pid)}</TableCell> */}
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={3}
                count={brands.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>

  );
};

export default BrandComp;
