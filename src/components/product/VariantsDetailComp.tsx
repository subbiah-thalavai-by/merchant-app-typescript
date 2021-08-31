/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/img-redundant-alt */
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
  IconButton,
  Box,
} from '@material-ui/core';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useDebounce } from 'use-debounce';

import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { AuthContext } from '../../context/AuthContext';
import { firebaseConfig, db, storageRef } from '../../firebaseSetup';
import BootstrapTooltip from '../../common-components/BootstrapTooltip';
import propertiesfile from '../../resource.json';

// const fireStoreApi = require('../../fireStoreApi')
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
      // width: '25ch',
    },
    // '& > * + *': {
    //     marginTop: theme.spacing(2),
    //     width: '100%',
    // },
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1),
    },
    '& .MuiDropzonePreviewList-image': {
      maxHeight: '120px',
      height: 'auto',
    },
    '& .MuiDropzonePreviewList-removeButton': {
      // top: '0px',
      // right: '0px',
      // color:'red'
    },
    '& .MuiDropzoneArea-text': {
      fontSize: ['12px', '!important'],
    },
    '& .MuiDropzoneArea-icon': {
      width: '20px',
      height: '20px',
    },

  },
  logo: {
    width: '200px',
  },
  dropzonediv: {
    width: '120px',
    minHeight: '120px',
    marginRight: '16px',
    float: 'left',
  },
  dropZoneNoneClass: {
    display: 'none !important',
  },
  previewContainer: {
    width: '20%',
    display: 'block',
    minHeight: '100px',
  },
  previewItem: {
    maxWidth: '100% !important',
  },
  previewImg: {
    width: '100% !important',
    height: '120px !important',
  },
  pageTitle: {
    fontWeight: 'bold',
    // color: theme.color,
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
  boxDivPaper1: {
    padding: '16px',
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
  },
  boxDropZoneDiv: {
    marginTop: '8px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'center',
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
    // zIndex:'1000',

  },
  deleteImgBtn: {
    background: '#f2f2f2',
    position: 'absolute',
    /* margin-right: 5px; */
    marginLeft: '87px',
    marginTop: '-90px',
    padding: '3px',
    color: 'red',
  },
  loadImgDiv: {
    float: 'left',
    width: '120px',
    height: '120px',
    border: '1px solid',
    borderColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    height: 'auto',
    maxHeight: '120px',
    maxWidth: '100%',
    width: 'initial',
    marginTop: '4px',
  },
  createMargin: {
    marginTop: '8px',
    marginLeft: '8px',
    marginBottom: '8px',
  },
  cancelMargin: {
    marginTop: '8px',
    marginLeft: '16px',
    marginBottom: '8px',
  },
  resposiveTable: {
    width: '100%',
    overflowX: 'auto',
  },

}));

interface IVariantData {
    title: string;
    price: number;
    comparePrice: number;
    sku: string;
    barcode: string;
}

const VariantsDetailComp: React.FC = () => {
  const initialVariantState = {
    title: '',
    price: 0,
    comparePrice: 0,
    sku: '',
    barcode: '',
  };
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { vid } = useParams<{ vid: string }>();
  console.log(id);
  //   const productId = props.match.params.pid;
  const user = useContext(AuthContext);
  const classes = useStyles();
  const [variantData, setVariantData] = useState<IVariantData>(initialVariantState);

  const [progress, setProgress] = useState(100);
  const [imageURL, setimageURL] = useState(null);

  const [productImageList, setProductImageList] = useState([]);
  const [loadImgDiv, setLoadImgDiv] = useState(false);
  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);

  const UpdateVariantData = async () => {
    console.log(variantData);
    // const variantObj = {
    //   price: price.value,
    //   sku: sku.value,
    // };
    // const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}products/${productId}/variants/${variantId}`, variantObj);
    // console.log(response.data.id);
    // return response.data.id
  };

  useEffect(() => {
    // console.log(variantId);
    // console.log(productId);
    const fetchVaraintData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}products/${id}/variants/${vid}`);
      console.log(response.data);
      setVariantData(response.data);
    };
    fetchVaraintData();
    fetchProductImage();
  }, [setVariantData, productImageList]);

  const fetchProductImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}products/${id}/images`);
    const filteredImage = response.data.filter((e: any) => e.variantIds.includes(vid));
    console.log('image--------------');
    console.log(filteredImage);
    setProductImageList(filteredImage);
  };

  const handlefileupload = (e: any) => {
    console.log(e);
    const productImage = e;
    console.log(productImage);
    productImage.forEach((item: any, index: any) => {
      setLoadImgDiv(true);
      const currentdate = Date.now();
      const fileStoreRef = storageRef.child(`product_images/${id}/${currentdate}`).put(item);
      fileStoreRef.on('state_changed',
        (snapshot) => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          setProgress(progress);
          fileStoreRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            const obj = {
              src: downloadURL,
              position: index,
              variantIds: [vid],
            };
            const response = axios.post(`${process.env.REACT_APP_BASE_URL}products/${id}/images`, obj);
            fetchProductImage();
            setLoadImgDiv(false);
          });
        });
    });
  };

  const handleDeleteIconClicks = async (image: any) => {
    console.log(image.id);
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}products/${id}/images/${image.id}`);
    fetchProductImage();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVariantData({ ...variantData, [name]: value });
  };

  const cancelClick = () => {
    history.push(`/products/${id}/`);
  };

  return (
    <>
      {
                progress < 100
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
                          {propertiesfile.variant_detail}
                        </Typography>
                      </Grid>

                      <Grid item xs={9}>

                        <Grid item xs={12}>
                          <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-flex' }}>
                            <Paper elevation={3} className={classes.boxDivPaper1} style={{ width: '100%', float: 'left' }}>
                              <DropzoneArea
                                key={debounceKey}
                                acceptedFiles={['image/*']}
                                onChange={(e) => handlefileupload(e)}
                                showPreviewsInDropzone={false}
                                dropzoneClass={`${classes.dropzonediv} ${productImageList.length >= 3 && classes.dropZoneNoneClass}`}
                                previewGridProps={{ container: { spacing: 1, direction: 'row', alignItems: 'flex-start' } }}
                                // dropzoneParagraphClass={classes.dropzonetext}
                                previewGridClasses={{
                                  container: classes.previewContainer,
                                  item: classes.previewItem,
                                  image: classes.previewImg,
                                }}
                                previewText=""
                                showPreviews={false}
                                filesLimit={1}
                              />
                              {/* {productImageList} */}
                              {productImageList && productImageList.map((image: any) => (
                                <>
                                  <div className={classes.previewImgDiv}>
                                    <div>
                                      <img alt="image" className={classes.uploadedImage} src={image.src} />
                                    </div>

                                    <IconButton className={classes.deleteImgBtn} name="details" onClick={(_e) => handleDeleteIconClicks(image.image)}>
                                      <DeleteIcon />
                                    </IconButton>

                                  </div>
                                </>
                              ))}
                              {
                                loadImgDiv
                                    && (
                                    <div className={classes.loadImgDiv}>
                                      <CircularProgress />
                                    </div>
                                    )
                                }
                            </Paper>
                          </Box>
                        </Grid>

                        <Grid item xs={12} justify="flex-start">
                          <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
                            <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                              <div className={classes.boxInnerDiv}>
                                <TextField size="small" type="text" name="price" variant="outlined" value={variantData.price} onChange={handleInputChange} />

                                <div className={classes.boxInnerDivToolTip}>
                                  <BootstrapTooltip title="Price">
                                    {/* <span> ? </span> */}
                                    <HelpOutlineIcon />
                                  </BootstrapTooltip>
                                </div>
                              </div>
                              <div className={classes.boxInnerDiv}>
                                <TextField size="small" type="text" name="comparePrice" variant="outlined" value={variantData.comparePrice} onChange={handleInputChange} />

                                <div className={classes.boxInnerDivToolTip}>
                                  <BootstrapTooltip title="comparePrice">
                                    {/* <span> ? </span> */}
                                    <HelpOutlineIcon />
                                  </BootstrapTooltip>
                                </div>
                              </div>
                              <div className={classes.boxInnerDiv}>
                                <TextField size="small" type="text" name="sku" variant="outlined" value={variantData.sku} onChange={handleInputChange} />
                                <div className={classes.boxInnerDivToolTip}>
                                  {/* <BootstrapTooltip title="Brand Name">
                                                        <HelpOutlineIcon />
                                                    </BootstrapTooltip> */}
                                </div>
                              </div>
                              <div className={classes.boxInnerDiv}>
                                <TextField size="small" type="text" name="barcode" variant="outlined" value={variantData.barcode} onChange={handleInputChange} />
                                <div className={classes.boxInnerDivToolTip}>
                                  {/* <BootstrapTooltip title="Brand Name">
                                                        <HelpOutlineIcon />
                                                    </BootstrapTooltip> */}
                                </div>
                              </div>
                            </Paper>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box component="div" className={classes.boxDiv}>
                            <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
                              <Box>
                                <Button
                                  className={classes.createMargin}
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  onClick={UpdateVariantData}
                                >
                                  {propertiesfile.button_update}

                                </Button>

                                <Button
                                  className={classes.cancelMargin}
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

                      <Grid item xs={3} spacing={1}>
                        {/* <Card elevation={3}>
                          <CardContent>
                            <Typography component="div" className={classes.cardTitleDiv}>
                              Quick Actions
                            </Typography>
                            <Typography className={classes.cardBodyDiv}>
                              1.25%
                              {' '}
                              <ExpandLessIcon style={{ color: '#27AE60' }} />
                              {' '}
                              <span className={classes.cardBodyDivInd} style={{}}>1.21%</span>
                              {' '}
                              <br />
                              <span className={classes.cardBodySubDiv}>Womans Dresses</span>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">View Trending Categories</Button>
                          </CardActions>
                        </Card> */}
                      </Grid>

                    </Grid>
                  )
            }
    </>
  );
};

export default VariantsDetailComp;
