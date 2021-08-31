/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Typography,
  Paper,
  Grid,
  Button,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormattedMessage } from 'react-intl';
import LinearProgress from '@material-ui/core/LinearProgress';
import propertiesfile from '../../resource.json';
import ErrorMessageDialog from '../../common-components/ErrorMessageDialog';

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

const TaxDetailComp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
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
  const [taxCountry, setTaxCountry] = useState({} as any);
  const [isFormInvalid, setIsFormInvalid] = useState([{ title: '', description: '' }] as any);
  const [progress, setProgress] = useState(100);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTax({ ...tax, [name]: value });
  };

  const saveTAx = async () => {
    const errorObj = {} as any;
    let error = false;
    if (tax.code !== '') {
      errorObj.code = false;
    } else {
      errorObj.code = true;
      error = true;
    }
    if (tax.rate !== 0) {
      errorObj.rate = false;
    } else {
      errorObj.rate = true;
      error = true;
    }
    if (selectedCountry.id !== '') {
      errorObj.countryId = false;
    } else {
      errorObj.countryId = true;
      error = true;
    }
    setIsFormInvalid(errorObj);

    if (!error) {
      setProgress(0);
      const taxData = await updateTaxData();
      setProgress(100);
      if (taxData === 'success') {
        history.push('/taxes');
      }
      // axios.patch(`${process.env.REACT_APP_BASE_URL}taxes/${id}`, tax)
      //   .then((res) => history.push('/taxes'));
    }
  };

  const updateTaxData = async () => {
    let returnValue;
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}taxes/${id}`, tax);
      returnValue = 'success';
    } catch (e: any) {
      setErrorOpen(true);
      setApiError(e.response.data.message);
      returnValue = 'error';
    }
    return returnValue;
  };
  const cancelClick = () => {
    history.push('/taxes');
  };

  const handleErrorDialogClose = () => {
    setErrorOpen(false);
  };

  useEffect(() => {
    const fetchtTaxData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}taxes/${id}`);
      console.log(response.data);
      setTax(response.data);
      const countryData = await axios.get(`${process.env.REACT_APP_BASE_URL}countries/${response.data.countryId}`);
      setTaxCountry(countryData.data);
    };
    const fetchtCountryList = async () => {
      const response = await axios.get<Icountry[]>(`${process.env.REACT_APP_BASE_URL}countries`);
      setCountries(response.data);
      // setTaxCountry(response.data[0]);
    };
    fetchtTaxData();
    fetchtCountryList();

    // const cid = countries.filter((item) => item.id == tax.countryId);
    // console.log(cid);
    // setTaxCountry(cid);
  }, []);

  return (
    <>
      { progress < 100
        ? (
          <div>
            <LinearProgress />
          </div>
        )
        : (
          <Grid
            container
            spacing={2}
            className={clsx(classes.gridClass, classes.root)}
          >
            <Grid item xs={12} spacing={1}>
              <Typography component="div" className={classes.pageTitle}>
                {propertiesfile.title_tax_detail}
              </Typography>
            </Grid>

            <Grid item xs={9}>

              <Grid item xs={12} justify="flex-start">
                <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                  <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                    <div className={classes.boxInnerDiv}>
                      <TextField
                        error={isFormInvalid.code}
                        helperText={isFormInvalid.code && (
                        <FormattedMessage
                          id={propertiesfile.RequiredErrorMessage}
                          defaultMessage={propertiesfile.RequiredErrorMessage}
                          values={{ e: `${'Tax Code'}` }}
                        />
                        )}
                        size="small"
                        type="text"
                        name="code"
                        label="Code"
                        variant="outlined"
                        value={tax.code}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={classes.boxInnerDiv}>
                      <TextField
                        error={isFormInvalid.rate}
                        helperText={isFormInvalid.rate && (
                        <FormattedMessage
                          id={propertiesfile.RequiredErrorMessage}
                          defaultMessage={propertiesfile.RequiredErrorMessage}
                          values={{ e: `${'Tax Rate'}` }}
                        />
                        )}
                        size="small"
                        type="text"
                        name="rate"
                        label="Rate"
                        variant="outlined"
                        value={tax.rate}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* {taxCountry.name} */}
                    <div className={classes.boxInnerDiv}>
                      <Autocomplete
                        value={taxCountry}
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
                        renderInput={(params) => (
                          <TextField
                            error={isFormInvalid.countryId}
                            helperText={isFormInvalid.countryId && (
                            <FormattedMessage
                              id={propertiesfile.RequiredErrorMessage}
                              defaultMessage={propertiesfile.RequiredErrorMessage}
                              values={{ e: `${'Country'}` }}
                            />
                            )}
                            {...params}
                            label="Select Country"
                            variant="outlined"
                            name="countryId"
                          />
                        )}
                      />
                    </div>

                    <Box className={classes.buttonmargin}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={saveTAx}
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
        )}
      <ErrorMessageDialog isOpen={errorOpen} onClose={handleErrorDialogClose} message={apiError} />
    </>
  );
};

export default TaxDetailComp;
