/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  useHistory, Redirect, useParams,
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

const CustomerAddressDetailcomp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
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

  const [customersAdress, setCustomersAdress] = React.useState<ICustomerAddress>(intialCustomerAddressState);
  const [isFormInvalid, setIsFormInvalid] = useState([{ }] as any);
  const [progress, setProgress] = useState(100);

  const { id, aid } = useParams<{ id: string, aid:string }>();
  console.log(id);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    setCustomersAdress({ ...customersAdress, [name]: value });
  };

  React.useEffect(() => {
    const fetCustomerAddressList = async () => {
      const response = await axios
        .get<ICustomerAddress>(`${process.env.REACT_APP_BASE_URL}customers/${id}/addresses/${aid}`);
      setCustomersAdress(response.data);
      console.log(response.data);
    };

    fetCustomerAddressList();
  }, []);

  const saveCustomerAddress = () => {
    const errorObj = {} as any;
    let error = false;
    if (customersAdress.firstName !== '') {
      errorObj.firstName = false;
    } else {
      errorObj.firstName = true;
      error = true;
    }
    if (customersAdress.lastName !== '') {
      errorObj.lastName = false;
    } else {
      errorObj.lastName = true;
      error = true;
    }
    if (customersAdress.isdCode !== '') {
      errorObj.isdCode = false;
    } else {
      errorObj.isdCode = true;
      error = true;
    }
    if (customersAdress.phoneNumber !== '') {
      errorObj.phoneNumber = false;
    } else {
      errorObj.phoneNumber = true;
      error = true;
    }
    if (customersAdress.address1 !== '') {
      errorObj.address1 = false;
    } else {
      errorObj.address1 = true;
      error = true;
    }
    if (customersAdress.address2 !== '') {
      errorObj.address2 = false;
    } else {
      errorObj.address2 = true;
      error = true;
    }
    if (customersAdress.city !== '') {
      errorObj.city = false;
    } else {
      errorObj.city = true;
      error = true;
    }
    if (customersAdress.country !== '') {
      errorObj.country = false;
    } else {
      errorObj.country = true;
      error = true;
    }
    if (customersAdress.zip !== '') {
      errorObj.zip = false;
    } else {
      errorObj.zip = true;
      error = true;
    }
    setIsFormInvalid(errorObj);
    if (!error) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/customers/${id}/addresses`, customersAdress)
        .then((res) => history.push('/customers'));
      console.log(customersAdress);
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
            {propertiesfile.title_customer_address_detail}
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
                    value={customersAdress.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.lastName}
                    helperText={isFormInvalid.lastName && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={customersAdress.lastName}
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
                    value={customersAdress.isdCode}
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
                    value={customersAdress.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.address1}
                    helperText={isFormInvalid.address1 && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="address1"
                    label="Address1"
                    variant="outlined"
                    value={customersAdress.address1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.address2}
                    helperText={isFormInvalid.address2 && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="address2"
                    label="Address2"
                    variant="outlined"
                    value={customersAdress.address2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.city}
                    helperText={isFormInvalid.city && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="city"
                    label="City"
                    variant="outlined"
                    value={customersAdress.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.country}
                    helperText={isFormInvalid.country && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="country"
                    label="Country"
                    variant="outlined"
                    value={customersAdress.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField
                    error={isFormInvalid.zip}
                    helperText={isFormInvalid.zip && propertiesfile.RequiredErrorMessage}
                    size="small"
                    type="text"
                    name="zip"
                    label="Zip"
                    variant="outlined"
                    value={customersAdress.zip}
                    onChange={handleInputChange}
                  />
                </div>

                <Box className={classes.buttonmargin}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveCustomerAddress}
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

export default CustomerAddressDetailcomp;
