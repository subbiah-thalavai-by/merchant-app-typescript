/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
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
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  categoryClass: {
    width: '100%',
  },
  buttonmargin: {
    margin: '8px',
  },
  cancelmargin: {
    marginLeft: '16px',
  },

}));

interface ITaxData {
    code: string,
    rate: number,
    countryId: string,
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

const CreateTaxComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialTaxState = {
    code: '',
    rate: 0,
    countryId: '',
  };

  const initialCountryState = {
    id: '',
    name: '',
    code: '',
    isdCode: '',
    currency: '',
    currencySymbol: '',
  };

  const [tax, setTax] = useState<ITaxData>(initialTaxState);
  const [countries, setCountries]: [Icountry[], (Country: Icountry[]) => void] = React.useState(defaultContry);
  const [selectedCountry, setSelectedCountry]: [Icountry, (Brand: Icountry) => void] = useState<Icountry>(initialCountryState);

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
    console.log(name);
    console.log(value);
    setTax({ ...tax, [name]: value });
  };

  const saveTAx = () => {
    const taxObj = {
      code: tax.code,
      rate: tax.rate,
      countryId: selectedCountry.id,
    };
    console.log(taxObj);
    axios.post(`${process.env.REACT_APP_BASE_URL}taxes`, taxObj)
      .then((res) => history.push('/taxes'));
  };
  const cancelClick = () => {
    history.push('/taxes');
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
            Create Tax
          </Typography>
        </Grid>

        <Grid item xs={9}>
          {countries.length > 0 && countries[0].id}
          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="code" label="Code" variant="outlined" value={tax.code} onChange={handleInputChange} />
                </div>
                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="rate" label="Rate" variant="outlined" value={tax.rate} onChange={handleInputChange} />
                </div>
                <div className={classes.boxInnerDiv}>
                  <Autocomplete
                    value={countries[0]}
                    size="small"
                    className={classes.categoryClass}
                    id="country-selection"
                    onChange={(e: object, value: any | null) => {
                      if (value) {
                        console.log(value);
                        setSelectedCountry(value);
                      }
                    }}
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                      <>
                        <span>{`${option.name}(+${option.isdCode})`}</span>
                      </>
                    )}
                    renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" name="countryId" />}
                  />
                </div>

                <Box className={classes.buttonmargin}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveTAx}
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

export default CreateTaxComp;
