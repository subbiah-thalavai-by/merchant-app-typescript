/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
  Box,
} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { DropzoneArea, DropzoneAreaProps } from 'material-ui-dropzone';
import { FormattedMessage } from 'react-intl';
import { storageRef } from '../../firebaseSetup';
import propertiesfile from '../../resource.json';

interface ICollectionData {
    title: string,
    description: string,
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

  // css for dropzonarea end

}));
const CreateCollectionComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialCollectionState = {
    title: '',
    description: '',
  };
  const [collection, setCollection] = useState<ICollectionData>(initialCollectionState);
  const [collectionImage, setCollectionImage] = useState([]);
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
      const collectionData = await AddCollectionData();
      await AddcollectionImage(collectionData);
      setProgress(100);
      console.log(collectionData);
      history.push('/collections');
      console.log(collection);
    }
  };

  const AddCollectionData = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}collections`, collection);
    return response.data.id;
  };

  const AddcollectionImage = async (id: any) => new Promise<void>((resolve, reject) => {
    const fileStoreRef = storageRef.child(`collections_images/${id}`).put(collectionImage[0]);
    fileStoreRef.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error: any) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      () => {
        // setProgress(progress);
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        fileStoreRef.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
          console.log('File available at', downloadURL);
          const brandImgObj = {
            imageURL: downloadURL,
          };
          axios.patch(`${process.env.REACT_APP_BASE_URL}collections/${id}`, brandImgObj);
          resolve();
        });
      });
  });

  const handlefileupload = (e: any) => {
    console.log(e);
    setCollectionImage(e);
  };

  const cancelClick = () => {
    history.push('/collections');
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
                {propertiesfile.title_collection_create}
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <Grid item xs={12} justify="flex-start">
                <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                  <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                    <div className={classes.boxDropZoneDiv}>
                      <DropzoneArea
                        acceptedFiles={['image/*']}
                        onChange={(e) => handlefileupload(e)}
                        showPreviewsInDropzone={false}
                        dropzoneClass={`${classes.dropzonediv}`}
                        previewGridClasses={{
                          container: classes.previewContainer,
                          item: classes.previewItem,
                        }}
                        previewText=""
                        showPreviews
                        filesLimit={1}
                      />
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
                        helperText={isFormInvalid.title && (
                        <FormattedMessage
                          id={propertiesfile.RequiredErrorMessage}
                          defaultMessage={propertiesfile.RequiredErrorMessage}
                          values={{ e: `${'collection Title'}` }}
                        />
                        )}
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
        )}
    </>
  );
};

export default CreateCollectionComp;
