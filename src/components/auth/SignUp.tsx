/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
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
import { firebaseConfig, db } from '../../firebaseSetup';

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
    email: string,
    password: string,
}

const SignUp = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [country, setcountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [termsChecked, setTermsChecked] = useState(null);
  const classes = useStyles();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      email, password,
    } = e.target.elements;
    try {
    //   const countryData = await fetchCountryData(country);
      const response = await firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
      // .then((result) => {
      //   setCurrentUser(true);
      // }).catch( (error) => {
      //   // Handle error.s
      //   console.log("error")
      // });
      console.log(response);
      //   const orgDataId = await AddOrgData(title, countryData);
      //   const userData = await AddUserData(email, name, lastName, phoneNumber, countryData, orgDataId);
      console.log('++++++++++++++++++++++');
      // history.push('/dashboard')
      // console.log(countryData)
    } catch (error) {
      alert(error);
    }
  };

  //   const fetchCountryData = async (country) => {
  //     console.log(country);
  //     const response = db.collection('country').where('name', '==', country);
  //     const data = await response.get();
  //     // console.log(data.docs[0].id)
  //     // console.log(data.docs[0].data())
  //     const responseData = data.docs[0].data();
  //     responseData.id = data.docs[0].id;

  //     return responseData;
  //   };

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

  useEffect(() => {
    const fetchCountryList = async () => {
    //   const datas = await db.collection('country').orderBy('name').get();
    //   datas.docs.map((doc) => console.log(doc.data()));
    //   setCountryList(datas.docs.map((doc) => doc.data()));
    };
    fetchCountryList();
  }, []);

  // if (currentUser) {
  //   return <Redirect to="/dashboard" />;
  // }

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

          <form onSubmit={handleSubmit} className={classes.root}>
            <Grid container xs={12}>
              <Grid item xs={6} style={{ paddingLeft: '0px' }}>
                {' '}
                <TextField type="text" name="name" placeholder="name" label="Name" variant="outlined" />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: '10px' }}>
                {' '}
                <TextField type="text" name="lastName" label="Last Name" variant="outlined" />
                {' '}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField type="email" name="email" placeholder="Email" label="Email Address" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField type="password" name="password" placeholder="Password" label="Password" variant="outlined" />
            </Grid>
            <Grid item xs={12}>

              <TextField type="text" name="title" placeholder="org name" label="Organization Name" variant="outlined" />
            </Grid>

            <Grid item container xs={12}>
              <Grid direction="column" item xs={3}>
                {/* <Autocomplete
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    console.log(JSON.stringify(newValue, null, ' '));
                    if (newValue) {
                      setcountry(newValue.name);
                    }
                  }}
                  options={countryList}
                  getOptionLabel={(option) => option.isd_code}
                  renderOption={(option) => (
                    <>
                      <span>{`${option.name}(+${option.isd_code})`}</span>
                    </>
                  )}
                  renderInput={(params) => <TextField {...params} label="Select Code" variant="outlined" style={{ marginBottom: '0px' }} />}
                /> */}
              </Grid>
              <Grid direction="column" item xs={9} style={{ paddingLeft: '10px' }}>
                <TextField style={{ marginBottom: '0px' }} type="tel" name="phoneNumber" placeholder="Phone number" label="Phone Number" variant="outlined" />
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
              >
                {' '}
                Sign Up Now
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p>
                {' '}
                Have an account?
                {' '}
                <Link to="/"> Sign in </Link>
                {' '}
              </p>
            </Grid>
          </form>

        </Grid>
        {/* <FooterComp /> */}
      </Grid>
    </>
  );
};

export default SignUp;
