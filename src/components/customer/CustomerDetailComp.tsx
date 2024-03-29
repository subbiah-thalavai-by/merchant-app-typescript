/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  useHistory, Redirect, useParams, Link,
} from 'react-router-dom';
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

interface ICustomer {
    id: string;
    firstName: string;
    lastName: string;
    isdCode: string;
    phoneNumber: string;
    email: string;
    emailVerified: boolean;
    marketing: string;
}

interface ICustomerAddress {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    countryCode: string;
    zip: string;
    isdCode: string;
    phoneNumber: string;
}

const defaultCiustomerAdresses: ICustomerAddress[] = [];

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

const CustomerDetailComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const intialCustomerState = {
    id: '',
    firstName: '',
    lastName: '',
    isdCode: '',
    phoneNumber: '',
    email: '',
    emailVerified: false,
    marketing: '',
  };
  const intialCustomerAddressState = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    countryCode: '',
    zip: '',
    isdCode: '',
    phoneNumber: '',
  };
  const [customer, setCustomer] = React.useState<ICustomer>(intialCustomerState);
  const [customersAdress, setCustomersAdress] = React.useState<ICustomerAddress>(intialCustomerAddressState);
  const [isFormInvalid, setIsFormInvalid] = useState([{ }] as any);
  const [progress, setProgress] = useState(100);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  const { id } = useParams<{ id: string }>();
  console.log(id);

  React.useEffect(() => {
    const fetCustomerList = async () => {
      const response = await axios
        .get<ICustomer>(`${process.env.REACT_APP_BASE_URL}customers/${id}`);
      setCustomer(response.data);
      console.log(response.data);
    };

    fetCustomerList();
  }, []);

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

    console.log(customer);
    if (!error) {
      setProgress(0);
      const customerData = await updateCustomerData();
      setProgress(100);
      history.push('/customers');
      // axios.post(`${process.env.REACT_APP_BASE_URL}customers`, customer)
      //   .then((res) => history.push('/customers'));
    }
  };

  const updateCustomerData = async () => {
    let returnValue;
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}customers`, customer);
      returnValue = 'success';
    } catch (e: any) {
      setErrorOpen(true);
      setApiError(e.response.data.message);
      returnValue = 'error';
    }
    return returnValue;
  };

  const cancelClick = () => {
    history.push('/customers');
  };

  // const redirect = () => {
  //   alert('vaada');
  //   // history.push(`/#/customers/${id}/addresses`);
  //     <Redirect to={`/#/customers/${id}/addresses`} />;
  // };

  return (
    <>
      <Grid
        container
        spacing={2}
        className={clsx(classes.gridClass, classes.root)}
      >
        <Grid item xs={12} spacing={1}>
          <Box display="flex" pb={2}>
            <Box flexGrow={1}>
              <Typography component="div" className={classes.pageTitle}>
                {' '}
                {propertiesfile.title_customer_detail}
                {' '}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/customers/${id}/addresses`}
              >
                {propertiesfile.button_customer_address}
              </Button>
              {/* <a href={`/#/customers/${id}/addresses`}>Customer Address</a> */}
            </Box>
          </Box>
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
                    label="firstName"
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
                    label="firstName"
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
                    label="isdCode"
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
                    label="phoneNumber"
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
                    label="email"
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
                    {propertiesfile.button_update}
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

export default CustomerDetailComp;
