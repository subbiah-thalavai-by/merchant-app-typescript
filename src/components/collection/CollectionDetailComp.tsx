/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Box,
} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { DropzoneArea, DropzoneAreaProps } from 'material-ui-dropzone';

import { useDebounce } from 'use-debounce';
import DeleteIcon from '@material-ui/icons/Delete';
import { firebaseConfig, db, storageRef } from '../../firebaseSetup';
import propertiesfile from '../../resource.json';

interface ICollectionData {
    title: string,
    description: string,
    imageURL: string,
}

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
const CollectionDetailComp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const history = useHistory();
  const classes = useStyles();
  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);
  const initialCollectionState = {
    title: '',
    description: '',
    imageURL: '',
  };
  const [collection, setCollection] = useState<ICollectionData>(initialCollectionState);
  const [isFormInvalid, setIsFormInvalid] = useState([{ title: '', description: '' }] as any);
  const [progress, setProgress] = useState(100);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCollection({ ...collection, [name]: value });
  };

  const saveCollection = async () => {
    const errorObj = {} as any;
    let error = false;
    if (collection.title !== '') {
      errorObj.title = false;
    } else {
      errorObj.title = true;
      error = true;
    }

    setIsFormInvalid(errorObj);

    if (!error) {
      setProgress(0);
      const collectionData = await updateCollectionData();
      setProgress(100);
      history.push('/collections');
    }

    // console.log(collection);
    // axios.post(`${process.env.REACT_APP_BASE_URL}collections`, collection)
    //   .then((res) => history.push('/collections'));
  };

  const updateCollectionData = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}collections`, collection);
  };

  const handlefileupload = async (e: any) => {
    console.log(e);
    // eslint-disable-next-line eqeqeq
    if (e[0].name != '') {
      const uploadedimage = await AddCollectionImage(e);
    }
  };

  const handleDeleteIconClicks = async () => {
    console.log(id);
    const categoryObj = {
      imageURL: '',
    };
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}collections/${id}`, categoryObj);
    setCollection({
      ...collection,
      imageURL: '',
    });
  };

  const AddCollectionImage = async (imageFile: any[]) => new Promise<void>((resolve, reject) => {
    const fileStoreRef = storageRef.child(`category_images/${id}`).put(imageFile[0]);
    fileStoreRef.on('state_changed',
      (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error: any) => {
        console.log(error);
        reject(error);
      },
      () => {
        // setProgress(progress);
        fileStoreRef.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
          console.log('File available at', downloadURL);
          const categoryImgObj = {
            imageURL: downloadURL,
          };
          axios.patch(`${process.env.REACT_APP_BASE_URL}collections/${id}`, categoryImgObj);
          setCollection({
            ...collection,
            imageURL: downloadURL,
          });
          resolve();
        });
      });
  });

  const cancelClick = () => {
    history.push('/collections');
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}collections/${id}`);
      console.log(response.data);
      setCollection(response.data);
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
                {propertiesfile.title_collection_detail}
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <Grid item xs={12} justify="flex-start">
                <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                  <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                    {collection.imageURL
                      ? (
                        <div className={classes.previewImgDiv} style={{ margin: '8px' }}>
                          <div>
                            <img className={classes.uploadedImage} src={collection.imageURL} />
                          </div>
                          <IconButton className={classes.deleteImgBtn} name="details" onClick={() => handleDeleteIconClicks()}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )
                      : (
                        <div className={classes.boxDropZoneDiv}>
                          <DropzoneArea
                            key={debounceKey}
                            acceptedFiles={['image/*']}
                            onChange={(e) => handlefileupload(e)}
                            showPreviewsInDropzone={false}
                            dropzoneClass={`${classes.dropzonediv} ${collection.imageURL && classes.dropZoneNoneClass}`}
                            previewGridClasses={{
                              container: classes.previewContainer,
                              item: classes.previewItem,
                            }}
                            previewText=""
                            showPreviews={false}
                            filesLimit={1}
                            initialFiles={[collection.imageURL]}
                          />
                        </div>
                      )}
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
                        label="Collection Title"
                        variant="outlined"
                        value={collection.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={classes.boxInnerDiv}>
                      <TextField size="small" type="text" name="description" label="description" variant="outlined" value={collection.description} onChange={handleInputChange} />
                    </div>

                    <Box className={classes.buttonmargin}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={saveCollection}
                      >
                        {propertiesfile.button_update}

                      </Button>

                      <Button
                        className={classes.cancelmargin}
                        variant="outlined"
                        type="button"
                        onClick={cancelClick}
                      >
                        {' '}
                        {propertiesfile.button_cancel}

                      </Button>
                    </Box>

                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
    </>
  );
};

export default CollectionDetailComp;
