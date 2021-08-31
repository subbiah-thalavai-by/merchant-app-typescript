/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
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
import propertiesfile from '../../resource.json';

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

interface ICustomerData {
    firstName: string,
    lastName: string,
    isdCode: string,
    phoneNumber: string,
    email: string,
    emailVerified: boolean,
    marketing: string,
}

const CreateCustomerComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialCustomerState = {
    firstName: '',
    lastName: '',
    isdCode: '',
    phoneNumber: '',
    email: '',
    emailVerified: true,
    marketing: 'all',
  };
  const [customer, setCustomer] = useState<ICustomerData>(initialCustomerState);
  const [isFormInvalid, setIsFormInvalid] = useState([{ }] as any);
  const [progress, setProgress] = useState(100);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = async () => {
    const errorObj = {} as any;
    let error = false;
    if (customer.firstName !== '') {
      errorObj.firstName = false;
    } else {
      errorObj.firstName = true;
      error = true;
    }
    if (customer.lastName !== '') {
      errorObj.lastName = false;
    } else {
      errorObj.lastName = true;
      error = true;
    }
    if (customer.isdCode !== '') {
      errorObj.isdCode = false;
    } else {
      errorObj.isdCode = true;
      error = true;
    }
    if (customer.phoneNumber !== '') {
      errorObj.phoneNumber = false;
    } else {
      errorObj.phoneNumber = true;
      error = true;
    }
    if (customer.email !== '') {
      errorObj.email = false;
    } else {
      errorObj.email = true;
      error = true;
    }
    setIsFormInvalid(errorObj);
    if (!error) {
      setProgress(0);
      const customerData = await AddCustomerData();
      history.push('/customers');

      // axios.post(`${process.env.REACT_APP_BASE_URL}customers`, customer)
      //   .then((res) => history.push('/customers'));
    }
  };

  const AddCustomerData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}customers`, customer);
      return response.data.id;
    } catch (e: any) {
      setErrorOpen(true);
      setApiError(e.response.data.message);
    }
  };

  const cancelClick = () => {
    history.push('/customers');
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        className={clsx(classes.gridClass, classes.root)}
      >
        <Grid item xs={12} spacing={1}>
          <Typography component="div" className={classes.pageTitle}>
            {propertiesfile.title_customer_create}
          </Typography>
        </Grid>

        <Grid item xs={9}>

          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.firstName}
                    helperText={isFormInvalid.firstName && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={customer.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.firstName}
                    helperText={isFormInvalid.firstName && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="lastName"
                    label="First Name"
                    variant="outlined"
                    value={customer.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.isdCode}
                    helperText={isFormInvalid.isdCode && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="isdCode"
                    label="ISD Code"
                    variant="outlined"
                    value={customer.isdCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.phoneNumber}
                    helperText={isFormInvalid.phoneNumber && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    value={customer.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.email}
                    helperText={isFormInvalid.email && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={customer.email}
                    onChange={handleInputChange}
                  />
                </div>

                <Box className={classes.buttonmargin}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveCustomer}
                  >
                    {propertiesfile.button_create}
                  </Button>

                  <Button
                    className={classes.cancelmargin}
                    variant="outlined"
                    type="button"
                    onClick={cancelClick}
                  >
                    {propertiesfile.button_cancel}
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

export default CreateCustomerComp;
