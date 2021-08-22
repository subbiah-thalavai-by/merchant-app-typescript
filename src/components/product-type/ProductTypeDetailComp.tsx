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

interface IProductTypeData {
    title: string,
}

const ProductTypeDetailComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialProductTypeState = {
    title: '',
  };
  const [productType, setProductType] = useState<IProductTypeData>(initialProductTypeState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setProductType({ ...productType, [name]: value });
  };

  const saveProductType = () => {
    const productTypeObj = {
      title: productType.title,
    };

    console.log(productTypeObj);

    axios.post('https://alm-test.azurewebsites.net/api/2021/v1/product-types', productTypeObj)
      .then((res) => history.push('/product-types'));
  };
  const cancelClick = () => {
    history.push('/product-types');
  };
  return (
  // <div className="submit-form">
  //   <div>
  //     <div className="form-group">
  //       <input
  //         type="text"
  //         className="form-control"
  //         id="title"
  //         required
  //         value={productType.title}
  //         onChange={handleInputChange}
  //         name="title"
  //       />
  //     </div>
  //     <button type="button" onClick={saveProductType}>
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
                  <TextField size="small" type="text" name="title" label="Name" variant="outlined" value={productType.title} onChange={handleInputChange} />
                </div>

                <Box className={classes.buttonmargin}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveProductType}
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

export default ProductTypeDetailComp;
