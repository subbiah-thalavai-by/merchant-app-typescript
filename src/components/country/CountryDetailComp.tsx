/* eslint-disable no-console */
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Typography,
  Paper,
  Grid,
  Button,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1),
    },
    '& .MuiDropzonePreviewList-image': {
      // width: '100%',
      maxHeight: '120px',
      height: 'auto',
      borderRadius: ['0px', '!important'],
    },
    '& .MuiDropzonePreviewList-removeButton': {
      top: '0px',
      right: '0px',
      color: 'red',
      zIndex: '1000',
    },
    '& .MuiDropzoneArea-text': {
      fontSize: ['12px', '!important'],
    },
    '& .MuiDropzoneArea-icon': {
      width: '20px',
      height: '20px',
    },
    '& .MuiDropzonePreviewList-imageContainer': {
      padding: ['0px', '!important'],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '120px',
      width: '120px',
    },
  },
  pageTitle: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    fontSize: '24px',
    // marginTop:'15px',
    // paddingBottom:'15px'
  },
  gridClass: {
    flexGrow: 1,
  },
  boxDiv: {
    background: '#ffffff',
    marginBottom: '15px',
  },
  boxDivPaper: {
    padding: '8px',
  },
  boxInnerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '8px',
  },
  boxInnerDivToolTip: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'default',
  },
  formMargin: {
    marginTop: '8px',
    marginLeft: '8px',
  },
  buttonmargin: {
    margin: '8px',
  },
  cancelmargin: {
    marginLeft: '16px',
  },

}));

interface IcountryData {
  name: string,
  code: string,
  isdCode: string,
  currency: string,
  currencySymbol: string,
}

const ContryDetailComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialCountryState = {
    name: '',
    code: '',
    isdCode: '',
    currency: '',
    currencySymbol: '',
  };
  const [country, setCountry] = useState<IcountryData>(initialCountryState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // setCountry({ ...setCountry, [name]: value });
  };

  const saveCountry = () => {
    console.log(setCountry);
    axios.post(`${process.env.REACT_APP_BASE_URL}countries`, setCountry)
      .then((res) => history.push('/countries'));
  };
  const cancelClick = () => {
    history.push('/taxes');
  };

  return (
  // <div className="submit-form">
  //   <div>
  //     <div className="form-group">
  //       <input
  //         type="text"
  //         className="form-control"
  //         id="code"
  //         required
  //         value={country.name}
  //         onChange={handleInputChange}
  //         name="code"
  //       />
  //     </div>

  //     <div className="form-group">
  //       <input
  //         type="text"
  //         className="form-control"
  //         id="rate"
  //         required
  //         value={country.code}
  //         onChange={handleInputChange}
  //         name="rate"
  //       />
  //     </div>

  //     <div className="form-group">
  //       <input
  //         type="text"
  //         className="form-control"
  //         id="rate"
  //         required
  //         value={country.isdCode}
  //         onChange={handleInputChange}
  //         name="rate"
  //       />
  //     </div>

  //     <div className="form-group">
  //       <input
  //         type="text"
  //         className="form-control"
  //         id="rate"
  //         required
  //         value={country.currency}
  //         onChange={handleInputChange}
  //         name="rate"
  //       />
  //     </div>

  //     <div className="form-group">
  //       <input
  //         type="text"
  //         className="form-control"
  //         id="rate"
  //         required
  //         value={country.currencySymbol}
  //         onChange={handleInputChange}
  //         name="rate"
  //       />
  //     </div>

    //     <button type="button" onClick={saveCountry} className="btn btn-success">
    //       Submit
    //     </button>
    //   </div>
    // </div>
    <>
      <Grid
        container
        spacing={2}
        className={clsx(classes.gridClass, classes.root)}
      >
        <Grid item xs={12} spacing={1}>
          <Typography component="div" className={classes.pageTitle}>
            Create Product Type
          </Typography>
        </Grid>

        <Grid item xs={9}>

          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="code" label="Code" variant="outlined" value={country.name} onChange={handleInputChange} />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="rate" label="Rate" variant="outlined" value={country.code} onChange={handleInputChange} />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="rate" label="Rate" variant="outlined" value={country.isdCode} onChange={handleInputChange} />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="rate" label="Rate" variant="outlined" value={country.currency} onChange={handleInputChange} />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="rate" label="Rate" variant="outlined" value={country.currencySymbol} onChange={handleInputChange} />
                </div>

                <Box className={classes.buttonmargin}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveCountry}
                  >
                    {' '}
                    Create
                  </Button>

                  <Button
                    className={classes.cancelmargin}
                    variant="outlined"
                    type="button"
                    onClick={cancelClick}
                  >
                    {' '}
                    Cancel
                  </Button>
                </Box>

              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};

export default ContryDetailComp;
