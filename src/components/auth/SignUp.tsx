/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState, useEffect, ChangeEvent, useContext,
} from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import axios from 'axios';
import { firebaseConfig, db } from '../../firebaseSetup';
import { AuthContext } from '../../context/AuthContext';
import propertiesfile from '../../resource.json';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      // width: '25ch',
      fontSize: theme.spacing(2),
    },
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  logo: {
    width: '200px',
  },
  ButtonWidth: {
    width: '100%',
  },
}));

interface IUserData {
    email: string;
    password: string;
    firstName: string;
    lastName:string;
    isdCode:string;
    countryId: string;
    organazationId: string;
    phoneNumber:string;
}

interface Icountry {
  id: string;
  name: string;
  code: string;
  isdCode: string;
  currency: string;
  currencySymbol: string;
}

const defaultContry: Icountry[] = [];

const SignUp = () => {
  const user = useContext(AuthContext);
  const initialUserDataState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isdCode: '',
    countryId: '',
    organazationId: '',
    phoneNumber: '',
  };
  const history = useHistory();
  const [termsChecked, setTermsChecked] = useState(null);
  const classes = useStyles();
  const [countries, setCountries]: [Icountry[], (Country: Icountry[]) => void] = React.useState(defaultContry);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [userData, setUserData] = useState<IUserData>(initialUserDataState);

  //   const AddOrgData = async (title, countryData) => {
  //     let orgid;
  //     await db.collection('organization').add({
  //       title: title.value,
  //       country: countryData.id,
  //       countryName: countryData.name,
  //       active: true,
  //       cdt: new Date(),
  //       udt: new Date(),
  //     }).then((data) => {
  //       console.log('org added succesfully');
  //       console.log(data.id);
  //       orgid = data.id;
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //     return orgid;
  //   };

  //   const AddUserData = async (email, name, lastName, phoneNumber, countryData, orgDataId) => {
  //     db.collection('users').add({
  //       first_name: name.value,
  //       last_name: lastName.value,
  //       email: email.value,
  //       phone_number: phoneNumber.value,
  //       country: countryData.id,
  //       isd_code: countryData.isd_code,
  //       oid: orgDataId,
  //       active: true,
  //       cdt: new Date(),
  //       udt: new Date(),
  //     }).then((data) => {
  //       console.log('user added succesfully');
  //       console.log(data.id);
  //       // return <Redirect to="/dashboard" />;
  //       history.push('/dashboard');
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   };

  React.useEffect(() => {
    axios
      .get<Icountry[]>(`${process.env.REACT_APP_BASE_URL}countries`)
      .then((response) => {
        setCountries(response.data);
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const createUser = async () => {
    console.log(userData);
    const response = await firebaseConfig.auth().createUserWithEmailAndPassword(userData.email, userData.password);
  };

  if (user) {
    return <Redirect to="/brands" />;
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
      >

        <Grid item xs={5}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img src="/Blue_Yonder_rgb.jpg" alt="logo" className={classes.logo} />
          </Grid>

          <div className={classes.root}>
            <Grid container xs={12}>
              <Grid item xs={6} style={{ paddingLeft: '0px' }}>
                {' '}
                <TextField type="text" name="name" placeholder="name" label="Name" variant="outlined" value={userData.firstName} onChange={handleInputChange} />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: '10px' }}>
                {' '}
                <TextField type="text" name="lastName" label="Last Name" variant="outlined" value={userData.lastName} onChange={handleInputChange} />
                {' '}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField type="email" name="email" placeholder="Email" label="Email Address" variant="outlined" value={userData.email} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField type="password" name="password" placeholder="Password" label="Password" variant="outlined" value={userData.password} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField type="text" name="title" placeholder="org name" label="Organization Name" variant="outlined" value={userData.organazationId} onChange={handleInputChange} />
            </Grid>

            <Grid item container xs={12}>
              <Grid direction="column" item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  onChange={(e: object, value: any | null) => {
                    if (value) {
                      console.log(value);
                      // setSelectedCountry(value);
                    }
                  }}
                  options={countries}
                  getOptionLabel={(option) => option.isdCode}
                  renderOption={(option) => (
                    <>
                      <span>{`${option.name}(+${option.isdCode})`}</span>
                    </>
                  )}
                  renderInput={(params) => <TextField {...params} label="Select Code" variant="outlined" style={{ marginBottom: '0px' }} />}
                />
              </Grid>
              <Grid direction="column" item xs={9} style={{ paddingLeft: '10px' }}>
                <TextField style={{ marginBottom: '0px' }} type="tel" name="phoneNumber" placeholder="Phone number" label="Phone Number" variant="outlined" value={userData.phoneNumber} onChange={handleInputChange} />
              </Grid>

            </Grid>

            <Grid item xs={12}>
              <p>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="I have read the"
                />
                <a> Terms and Conditions </a>
              </p>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className={classes.ButtonWidth}
                onClick={createUser}
              >
                {propertiesfile.sign_up_now}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p>
                {' '}
                Have an account?
                {' '}
                <Link to="/">
                  {' '}
                  {propertiesfile.sign_in}
                  {' '}
                </Link>
                {' '}
              </p>
            </Grid>
          </div>

        </Grid>
        {/* <FooterComp /> */}
      </Grid>
    </>
  );
};

export default SignUp;
