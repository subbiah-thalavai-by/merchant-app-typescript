/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

import { useHistory, Redirect, useParams } from 'react-router-dom';

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
import { FormattedMessage } from 'react-intl';
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
  buttonmargin: {
    margin: '8px',
  },
  cancelmargin: {
    marginLeft: '16px',
  },

}));

interface IProductTypeData {
    title: string,
}

const ProductTypeDetailComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const initialProductTypeState = {
    title: '',
  };
  const [productType, setProductType] = useState<IProductTypeData>(initialProductTypeState);
  const [isFormInvalid, setIsFormInvalid] = useState([{ title: '' }] as any);
  const [progress, setProgress] = useState(100);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setProductType({ ...productType, [name]: value });
  };

  const saveProductType = async () => {
    const errorObj = {} as any;
    let error = false;
    if (productType.title !== '') {
      errorObj.title = false;
    } else {
      errorObj.title = true;
      error = true;
    }

    setIsFormInvalid(errorObj);

    if (!error) {
      setProgress(0);
      const productTypeData = await updateProductTypeData();
      setProgress(100);
      if (productTypeData === 'success') {
        history.push('/product-types');
      }
    }
  };

  const updateProductTypeData = async () => {
    const productTypeObj = {
      title: productType.title,
    };
    // const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}product-types/${id}`, productTypeObj);
    let returnValue;
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}product-types/${id}`, productTypeObj);
      returnValue = 'success';
    } catch (e: any) {
      setErrorOpen(true);
      setApiError(e.response.data.message);
      returnValue = 'error';
    }
    return returnValue;
  };

  useEffect(() => {
    const fetchProductType = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}product-types/${id}`);
      console.log(response.data);
      setProductType(response.data);
    };
    fetchProductType();
  }, []);

  const cancelClick = () => {
    history.push('/product-types');
  };

  const handleErrorDialogClose = () => {
    setErrorOpen(false);
  };

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
                {propertiesfile.title_product_type_detail}
              </Typography>
            </Grid>

            <Grid item xs={9}>

              <Grid item xs={12} justify="flex-start">
                <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                  <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                    <div className={classes.boxInnerDiv}>
                      <TextField
                        error={isFormInvalid.title}
                        helperText={isFormInvalid.title && (
                        <FormattedMessage
                          id={propertiesfile.RequiredErrorMessage}
                          defaultMessage={propertiesfile.RequiredErrorMessage}
                          values={{ e: `${'Title'}` }}
                        />
                        )}
                        size="small"
                        type="text"
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={productType.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Box className={classes.buttonmargin}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={saveProductType}
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

export default ProductTypeDetailComp;
