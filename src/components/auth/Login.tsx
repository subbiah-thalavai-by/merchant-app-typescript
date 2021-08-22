/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, ChangeEvent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon, { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import { CommonProps } from '@material-ui/core/OverridableComponent';
import { firebaseConfig, auth } from '../../firebaseSetup';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      // width: '30ch',
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
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
}));
function GIcon(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
      ,
      'Google',
    </SvgIcon>
  );
}

function FIcon(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" />
      ,
      'Facebook',
    </SvgIcon>
  );
}

interface IUserData {
    email: string,
    password: string,
}

const LogIn = () => {
  console.log('sadfasd');
  const user = useContext(AuthContext);
  const classes = useStyles();
  const initialUserState = {
    email: '',
    password: '',
  };

  const [userData, setUserData] = useState<IUserData>(initialUserState);

  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     const { email, password } = e.target.elements;
  //     try {
  //       firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const signIn = async () => {
    try {
      const res = await firebaseConfig.auth().signInWithEmailAndPassword(
        userData.email,
        userData.password,
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return <Redirect to="/brands" />;
  }
  return (
    <>

      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={5} spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            {/* Blue_Yonder_rgb */}
            <img src="/Blue_Yonder_rgb.jpg" alt="logo" className={classes.logo} />
          </Grid>

          <Grid container xs={12} className={classes.marginBottom} spacing={1}>

            <Grid item xs={6} style={{ paddingLeft: '0px' }}>
              <Button
                type="submit"
                size="large"
                className={classes.ButtonWidth}
                variant="contained"
                color="primary"
                startIcon={<FIcon />}
              >
                Login with facebook

              </Button>
            </Grid>
            <Grid item xs={6} style={{ paddingRight: '0px' }}>
              <Button
                type="submit"
                size="large"
                className={classes.ButtonWidth}
                variant="contained"
                color="primary"
                startIcon={<GIcon />}
              >
                Login with Google

              </Button>
            </Grid>

          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center', fontSize: '16px', paddingBottom: '16px' }}>
            <span> or login with email address </span>
          </Grid>

          <div className={classes.root}>
            <Grid item xs={12} spacing={1}>
              <TextField type="email" name="email" label="Email" variant="outlined" value={userData.email} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField type="password" name="password" label="Password" variant="outlined" value={userData.password} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                size="large"
                className={classes.ButtonWidth}
                variant="contained"
                color="primary"
                onClick={signIn}
              >
                Login

              </Button>
            </Grid>
            <Grid item xs={12} style={{ fontSize: '16px', paddingTop: '16px' }}>
              <span>
                {' '}
                Dont have an account?
                {' '}
                <Link to="/signup">Sign Up </Link>
                {' '}
              </span>
            </Grid>
          </div>
          {/* <p> <Link to="/signup">Sign Up</Link> </p> */}
        </Grid>

        {/* <FooterComp /> */}

      </Grid>

    </>
  );
};

export default LogIn;
