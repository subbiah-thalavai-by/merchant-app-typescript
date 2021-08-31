/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, {
  useState, useEffect, useContext, ChangeEvent,
} from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { DropzoneArea } from 'material-ui-dropzone';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
} from '@material-ui/core';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDebounce } from 'use-debounce';
import { firebaseConfig, db, storageRef } from '../../firebaseSetup';
// import BootstrapTooltip from '../product/BootstrapTooltip';
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

  // css for dropzonarea start
  boxDropZoneDiv: {
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '8px',
    display: 'flex',
    // justifyContent: 'center'
  },
  dropzonediv: {
    width: '120px',
    minHeight: '120px',
    marginRight: '5px',
    float: 'left',
  },
  dropZoneNoneClass: {
    display: 'none !important',
  },
  previewItem: {
    maxWidth: '100% !important',
  },
  previewContainer: {
    width: '120px',
    display: 'block',
    border: '1px solid',
    borderColor: '#000',
    height: '120px',
    flexDirection: 'column',
    padding: '0px',
    margin: '0px',
    alignItems: 'center',
    justify: 'center',
    background: 'grey',
  },
  previewImgDiv: {
    border: '1px solid',
    borderColor: '#000',
    marginRight: '16px',
    float: 'left',
    height: '120px',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'grey',
  },
  uploadedImage: {
    height: 'auto',
    maxHeight: '120px',
    maxWidth: '100%',
    width: 'initial',
    marginTop: '4px',
  },
  deleteImgBtn: {
    background: '#f2f2f2',
    position: 'absolute',
    marginLeft: '87px',
    marginTop: '-90px',
    padding: '3px',
    color: 'red',
  },

  // css for dropzonarea end

}));

interface IBrandData {
    title: string,
    description: string,
    imageURL: string,
}

// interface IbrandImage {
//   file: File
// }

const BrandDetailComp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);
  const history = useHistory();
  const classes = useStyles();
  const initialBrandState = {
    title: '',
    description: '',
    imageURL: '',
  };

  const [brand, setBrand] = useState<IBrandData>(initialBrandState);
  const [brandImage, setBrandImage] = useState([] as any);
  const [isFormInvalid, setIsFormInvalid] = useState([{ title: '' }] as any);
  const [progress, setProgress] = useState(100);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBrand({ ...brand, [name]: value });
  };

  const handleDeleteIconClicks = async () => {
    const brandObj = {
      imageURL: '',
    };
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}brands/${id}`, brandObj);
    setBrand({
      ...brand,
      imageURL: '',
    });
  };

  const saveBrand = async () => {
    const errorObj = {} as any;
    let error = false;
    if (brand.title !== '') {
      errorObj.title = false;
    } else {
      errorObj.title = true;
      error = true;
    }

    setIsFormInvalid(errorObj);
    if (!error) {
      setProgress(0);
      const brandData = await updateBrandData();
      // console.log(brand);
      // axios.patch(`${process.env.REACT_APP_BASE_URL}brands/${id}`, brand)
      //   .then((res) => );
      // alert(brandData);
      setProgress(100);
      if (brandData === 'success') {
        history.push('/brands');
      }
    }
  };

  const updateBrandData = async () => {
    let returnValue;
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}brandss/${id}`, brand);
      returnValue = 'success';
    } catch (e: any) {
      setErrorOpen(true);
      setApiError(e.response.data.message);
      returnValue = 'error';
    }
    return returnValue;
  };

  const handlefileupload = async (e: any) => {
    console.log(e);
    // eslint-disable-next-line eqeqeq
    if (e[0].name != '') {
      const uploadedimage = await AddBrandImage(e);
    }
  };

  const AddBrandImage = async (imageFile: any[]) => new Promise<void>((resolve, reject) => {
    const fileStoreRef = storageRef.child(`brand_images/${id}`).put(imageFile[0]);
    fileStoreRef.on('state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        reject(error);
        setErrorOpen(true);
        setApiError('Could not access bucket');
      },
      () => {
        // setProgress(progress);
        fileStoreRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          const brandImgObj = {
            imageURL: downloadURL,
          };
          axios.patch(`${process.env.REACT_APP_BASE_URL}brands/${id}`, brandImgObj);
          setBrand({
            ...brand,
            imageURL: downloadURL,
          });
          resolve();
        });
      });
  });

  const cancelClick = () => {
    history.push('/brands');
  };

  const handleErrorDialogClose = () => {
    setErrorOpen(false);
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}brands/${id}`);
      console.log(response.data);
      setBrand(response.data);
    };
    fetchBrandData();
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
                {propertiesfile.title_brand_detail}
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <Grid item xs={12} justify="flex-start">
                <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                  <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                    <div className={classes.boxDropZoneDiv}>
                      {brand.imageURL

                        ? (
                          <div className={classes.previewImgDiv}>
                            <div>
                              <img className={classes.uploadedImage} src={brand.imageURL} />
                            </div>

                            <IconButton className={classes.deleteImgBtn} name="details" onClick={() => handleDeleteIconClicks()}>
                              <DeleteIcon />
                            </IconButton>

                          </div>
                        )

                        : (

                          <DropzoneArea
                            key={debounceKey}
                            acceptedFiles={['image/*']}
                            onChange={(e) => handlefileupload(e)}
                            showPreviewsInDropzone={false}
                            dropzoneClass={`${classes.dropzonediv} ${brand.imageURL && classes.dropZoneNoneClass}`}
                            previewGridClasses={{
                              container: classes.previewContainer,
                              item: classes.previewItem,
                            }}
                            previewText=""
                            showPreviews={false}
                            filesLimit={1}
                            initialFiles={[brand.imageURL]}
                          />

                        )}
                    </div>
                  </Paper>
                </Box>
              </Grid>

              <Grid item xs={12} justify="flex-start">
                <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                  <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                    <div className={classes.boxInnerDiv}>
                      <TextField
                        error={isFormInvalid.title}
                        helperText={isFormInvalid.title && propertiesfile.RequiredErrorMessage}
                        size="small"
                        type="text"
                        name="title"
                        label="brand Title"
                        variant="outlined"
                        value={brand.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={classes.boxInnerDiv}>
                      <TextField size="small" type="text" name="description" label="description" variant="outlined" value={brand.description} onChange={handleInputChange} />
                    </div>

                    <Box className={classes.buttonmargin}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={saveBrand}
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

      {/* error dialog code */}
      {/* <div> */}
      {/* <Dialog
          open={errorOpen}
          onClose={handleErrorDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">API Error</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {apiError}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleErrorDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div> */}
      {/* error dialog code end */}

      <ErrorMessageDialog isOpen={errorOpen} onClose={handleErrorDialogClose} message={apiError} />
    </>
  );
};

export default BrandDetailComp;
