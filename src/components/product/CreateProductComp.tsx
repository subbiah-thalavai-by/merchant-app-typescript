/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CreatableSelect from 'react-select/creatable';
import { DropzoneArea } from 'material-ui-dropzone';

import {
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@material-ui/core';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { OptionsType } from 'react-select';
import { storageRef } from '../../firebaseSetup';
import propertiesfile from '../../resource.json';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1),
    },
    '& .MuiAutocomplete-root': {
      width: '100%',
    },
    '& .MuiFormControlLabel-root': {
      width: '90%',
      margin: 0,

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
      zIndex: '10000',
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
      // display: 'table-cell',
      // verticalAlign: 'middle',
      // textAlign: 'center',
      height: '120px',
      width: '120px',
      border: '1px solid',
      borderColor: '#000',
      marginRight: '16px',
      background: 'grey',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
  resposiveTable: {
    width: '100%',
    overflowX: 'auto',
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
  categoryClass: {
    width: '100%',
  },
  customInput: {
    width: '90% !important',
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
  buttonMargin: {
    marginLeft: '8px',
    marginBottom: '8px',
  },
  formdeleteMargin: {
    // marginTop: '4px',
    padding: '0px',
  },
  inputwidth: {
    width: '93%',
    margin: '8px',
  },
  boxDivPaper1: {
    padding: '16px',
  },
  table: {
    minWidth: '700px',
  },
  addMargin: {
    marginLeft: '8px',
  },
  minWidthText: {
    minWidth: '200px',
  },
  tagWidth: {
    width: '100%',
    marginLeft: '8px',
    marginTop: '8px',
    marginBottom: '8px',
  },
  // dropzone css
  dropzonediv: {
    width: '120px',
    minHeight: '120px',
    marginRight: '16px',
    float: 'left',
    // display:'inlineFlex'
  },
  previewContainer: {
    width: '80%',
    float: 'left',
    margin: '0px !important',

  },
  previewItem: {
    maxWidth: '15%',
  },
  previewImg: {
    // width: '100%',
    // Height: '150px',
    // borderRadius: ['none','!important'],
  },
  dropzonetext: {
    fontSize: '12px',
  },
  dropZoneNoneClass: {
    display: 'none !important',
  },

}));

const components = {
  DropdownIndicator: null,
};

const customStyles = {
  // option: (provided, state) => ({
  //   ...provided,
  //   borderBottom: '1px dotted pink',
  //   color: state.isSelected ? 'red' : 'blue',
  //   padding: 20,
  // }),
  // control: (styles: object) => ({ ...styles, padding: '3px', width: '100%' }),

};

interface IProductData {
    title: string,
    description: string,
    brandId: string,
    productTypeId: string,
    collectionIds:Array<string>
}
interface IProductDetail {
  sku: string,
  barcode: string,
}

interface IBrand {
  id: string;
  title: string;
  description: string;
}

interface IProductType {
  id: string;
  title: string;
}

interface ICollection {
  id: string;
  title: string;
  description: string;
}

const defaultBrand: IBrand[] = [];
const defaultProductType: IProductType[] = [];
const defaultCollection: ICollection[] = [];

const CreateProductComp: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const initialProductState = {
    title: '',
    description: '',
    tags: '',
    brandId: '',
    productTypeId: '',
    collectionIds: [],
  };

  const initialProductDetailState = {
    sku: '',
    barcode: '',
  };

  const initialselectedBrandState = {
    id: '',
    title: '',
    description: '',
  };
  const initialselectedProductTypeState = {
    id: '',
    title: '',
  };

  const [product, setProduct] = useState<IProductData>(initialProductState);
  const [productDetail, setProductDetail] = useState<IProductDetail>(initialProductDetailState);

  // const [selectedTax, setSelectedTax] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<ICollection[]>([]);
  const [selectedProductType, setSelectedProductType]: [IProductType, (ProductType: IProductType) => void] = useState<IProductType>(initialselectedProductTypeState);
  const [selectedBrand, setSelectedBrand]: [IBrand, (Brand: IBrand) => void] = useState<IBrand>(initialselectedBrandState);
  const [brandList, setBrandList]: [IBrand[], (Brand: IBrand[]) => void] = React.useState(defaultBrand);
  const [categoryList, setCategoryList]: [ICollection[], (Collection: ICollection[]) => void] = React.useState(defaultCollection);
  const [productTypeList, setProductTypeList]: [IProductType[], (ProductType: IProductType[]) => void] = React.useState(defaultProductType);
  // const [taxList, setTaxList] = useState(null);

  const [mrp, setMRP] = useState(false);
  const [discount, setDiscount] = useState('amount');
  const [discountValue, setDiscountValue] = useState(0 as any);
  const [mrpvalue, setMRPvalue] = useState(0 as any);
  const [price, setPrice] = useState(0 as any);
  const [variantChecked, setVariantChecked] = useState(false);
  const [inputList, setInputList] = useState([{ optionName: '', optionValue: [] as any }]);
  const [optionList, setoptionList] = useState([]);
  const [optionValue, setOptionValue] = useState([{
    displayName: '', name: '', price: '', sku: '', barcode: '',
  }]);
  const [tagValue, setTagValue] = useState([] as any);
  const [productImage, setProductImage] = useState([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleProductDetailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductDetail({ ...productDetail, [name]: value });
  };

  useEffect(() => {
    const fetchtBrandList = async () => {
      const response = await axios.get<IBrand[]>(`${process.env.REACT_APP_BASE_URL}/brands`);
      setBrandList(response.data);
    };
    const fetCategoryList = async () => {
      const response = await axios.get<ICollection[]>(`${process.env.REACT_APP_BASE_URL}collections`);
      setCategoryList(response.data);
    };
    // const fetchTaxList = async () => {
    //   const response = await axios.get(`${process.env.REACT_APP_BASE_URL}taxes`);
    //   setTaxList(response.data);
    // };
    const fetProductTypeList = async () => {
      const response = await axios.get<IProductType[]>(`${process.env.REACT_APP_BASE_URL}product-types`);
      setProductTypeList(response.data);
    };

    // fetchTaxList();
    fetchtBrandList();
    fetCategoryList();
    fetProductTypeList();

    //    const clist =  fireStoreApi.getCategory();
    //    console.log("++++++++++++++++++++++++++++++++++++")

    const priceCalcualtion = () => {
      // if (mrp && mrpvalue && discount && discountValue) {
      if (mrp) {
        console.log(discount);
        console.log(mrpvalue);
        console.log(discountValue);
        let caculatePrice: any;
        if (discount == 'amount') {
          // eslint-disable-next-line radix
          caculatePrice = mrpvalue - discountValue;
        } else {
          const percentAmt = (mrpvalue * discountValue) / 100;
          caculatePrice = mrpvalue - percentAmt;
        }
        console.log(caculatePrice);
        setPrice(caculatePrice);
      } else {
        setPrice(0);
      }
    };

    priceCalcualtion();
  }, [mrp, mrpvalue, discount, discountValue]);

  const handelMRPChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // console.log(event.target.value);
    // const inputmrp: number = parseInt(event.target.value)
    if (event.target.value) {
      console.log(event.target.value);
      setMRP(true);
      setMRPvalue(event.target.value);
    } else {
      setMRP(false);
      setDiscountValue(0);
      setPrice(0);
    }
  };
  const handleDiscountChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setDiscount(event.target.value);
  };

  const handleDiscountValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setDiscountValue(event.target.value);
  };

  const handleVariantChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.checked);
    setVariantChecked(event.target.checked);
  };

  const handleOptionNameChange = (event: any, index: number): void => {
    console.log(index);

    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    const list = [...inputList];
    const oneList = { ...list[index] };
    oneList.optionName = value;
    list[index] = oneList;
    // console.log(list);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    if (list.length == 0) {
      setVariantChecked(false);
      setInputList([{ optionName: '', optionValue: [] as any }]);
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { optionName: '', optionValue: [] }]);
  };

  const handleoptionValueChange = (value: any, actionMeta: any, index: number) => {
    console.log(index);
    console.log(inputList);
    console.log(value);
    console.log(actionMeta);

    console.log(price);
    const list = [...inputList];
    console.log(list);
    if (actionMeta.action == 'create-option') {
      // list[index].optionValue.push(actionMeta.option.value);
      const oneList = { ...list[index] };
      oneList.optionValue.push(actionMeta.option.value);
      list[index] = oneList;
    }

    if (actionMeta.action == 'remove-value') {
      const optionArr = list[index].optionValue;
      const arrindex = optionArr.indexOf(actionMeta.removedValue.value);
      if (arrindex !== -1) {
        optionArr.splice(arrindex, 1);
      }
      list[index].optionValue = optionArr;
    }

    console.log(list);

    setInputList(list);

    const res: any[] = [];

    const option1Arry = inputList[0].optionValue;
    let option2Arry: string | any[] = [];
    let option3Arry: string | any[] = [];
    if (inputList[1]) {
      option2Arry = inputList[1].optionValue;
    }
    if (inputList[2]) {
      option3Arry = inputList[2].optionValue;
    }

    for (let i = 0; i < option1Arry.length; i++) {
      if (option2Arry.length > 0) {
        for (let j = 0; j < option2Arry.length; j++) {
          if (option3Arry.length > 0) {
            for (let k = 0; k < option3Arry.length; k++) {
              const obj = {
                displayName: '',
                name: '',
                price: '',
                sku: '',
                barcode: '',
              };
              obj.displayName = `${option1Arry[i]} / ${option2Arry[j]} / ${option3Arry[k]}`;
              obj.name = option1Arry[i] + option2Arry[j] + option3Arry[k];
              obj.price = price;
              obj.sku = productDetail.sku;
              obj.barcode = productDetail.barcode;
              res.push(obj);
            }
          } else {
            const obj = {
              displayName: '',
              name: '',
              price: '',
              sku: '',
              barcode: '',
            };
            obj.displayName = `${option1Arry[i]} / ${option2Arry[j]}`;
            obj.name = option1Arry[i] + option2Arry[j];
            obj.price = price;
            obj.sku = productDetail.sku;
            obj.barcode = productDetail.barcode;
            res.push(obj);
          }
        }
      } else {
        const obj = {
          displayName: '',
          name: '',
          price: '',
          sku: '',
          barcode: '',
        };
        obj.displayName = option1Arry[i];
        obj.name = option1Arry[i];
        obj.price = price;
        obj.sku = productDetail.sku;
        obj.barcode = productDetail.barcode;
        res.push(obj);
      }
    }
    console.log(res);
    setOptionValue(res);
  };

  const handlePriceChange = (event: any, index: number) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name);
    const list = [...optionValue];
    const oneList = { ...list[index] };
    oneList.price = value;
    list[index] = oneList;
    setOptionValue(list);
  };

  const handleSKUChange = (event: any, index: number) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name);
    const list = [...optionValue];
    const oneList = { ...list[index] };
    oneList.sku = value;
    list[index] = oneList;
    setOptionValue(list);
  };

  const handleBarcodeChange = (event: any, index: number) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name);
    const list = [...optionValue];
    const oneList = { ...list[index] };
    oneList.barcode = value;
    list[index] = oneList;
    setOptionValue(list);
  };

  const handleTagChange = (option: any, md: any) => {
    const tagArray: any[] = [];
    console.log(option);
    option.forEach((item: { value: any; }) => {
      tagArray.push(item.value);
    });
    console.log(tagArray);
    setTagValue(tagArray);
  };

  const handlefileupload = (e: any) => {
    console.log(e);
    setProductImage(e);
  };

  const saveProduct = async () => {
    const productData = await AddProductData();
    const optionsData = await AddOptionsData(productData);
    const variantData = await AddVariantData(productData);
    handleImageUpload(productData);
    console.log('save product');
    console.log(productDetail);
    history.push('/products');
  };

  const AddProductData = async () => {
    const categoriesIds: string[] = [];
    selectedCategory.forEach((element) => {
      categoriesIds.push(element.id);
    });
    const productObj = {
      title: product.title,
      description: product.description,
      brandId: selectedBrand.id,
      productTypeId: selectedProductType,
      collectionIds: categoriesIds,
      tags: tagValue,
      hasVariants: variantChecked,
      status: 'active',
    };
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}products`, productObj);
    console.log(response.data.id);
    return response.data.id;
  };

  const AddOptionsData = async (pid: any) => {
    if (inputList.length == 1 && inputList[0].optionName == '') {
      inputList[0].optionName = 'default';
    }
    inputList.forEach((option, index) => {
      const optionobj = {
        title: option.optionName,
        values: option.optionValue,
        productId: pid,
        position: index + 1,
      };
      console.log(optionobj);

      const response = axios.post(`${process.env.REACT_APP_BASE_URL}products/${pid}/options`, optionobj);
      // console.log(response.data)
    });
  };

  const AddVariantData = async (pid: any) => {
    if (optionValue.length > 0 && optionValue.length != 1) {
      optionValue.forEach((item, index) => {
        const obj = {
          title: item.displayName,
          price: item.price,
          compare_price: mrpvalue,
          sku: item.sku,
          barcode: productDetail.barcode,
          position: index + 1,
          option1: inputList.length == 1 ? inputList[0].optionName : '',
          option2: inputList.length == 2 ? inputList[1].optionName : '',
          option3: inputList.length == 3 ? inputList[2].optionName : '',
        };
        const response = axios.post(`${process.env.REACT_APP_BASE_URL}products/${pid}/variants`, obj);
      });
    } else {
      const obj = {
        title: 'default',
        price,
        comparePrice: mrpvalue,
        sku: productDetail.sku,
        barcode: productDetail.barcode,
        position: 1,
        option1: 'default',
        productId: pid,
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}products/${pid}/variants`, obj);
    }
  };

  const handleImageUpload = (pid: any) => {
    // setProgress(0);
    console.log(productImage);
    productImage.forEach((item, index) => {
      const currentdate = Date.now();
      // const _URL = window.URL || window.webkitURL;
      // let file; let img; let imageWidth; let
      //   imageHeight;
      // if ((file = item)) {
      //   img = new Image();
      //   img.onload = function () {
      //     imageWidth = this.width;
      //     imageHeight = this.height;
      //     console.log(`${this.width} ${this.height}`);
      //   };
      //   img.onerror = function () {
      //     alert(`not a valid file: ${file.type}`);
      //   };
      //   img.src = _URL.createObjectURL(file);
      // }

      const fileStoreRef = storageRef.child(`product_images/${pid}/${currentdate}`).put(item);
      fileStoreRef.on('state_changed',
        (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          // setProgress(progress);
          fileStoreRef.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
            console.log('File available at', downloadURL);
            const ProductImageObj = {
              src: downloadURL,
              position: index + 1,
            };
            console.log(ProductImageObj);
            const response = axios.post(`${process.env.REACT_APP_BASE_URL}products/${pid}/images`, ProductImageObj);
          });
        });
    });
  };

  const handleRemoveVariantClick = (index: number) => {
    console.log(optionValue[index].displayName);
    const { displayName } = optionValue[index];
    const filteredArray = optionValue.filter((itm) => displayName.indexOf(itm.displayName) == -1);
    setOptionValue(filteredArray);
    // if (filteredArray.length == 0) {
    //   setVariantChecked(false);
    // }
  };

  const cancelClick = () => {
    history.push('/products');
  };
  return (

    <>
      <Grid
        container
        spacing={2}
        className={clsx(classes.gridClass, classes.root)}
      >
        <Grid item xs={12} spacing={1}>
          <Typography component="div" className={classes.pageTitle}>{propertiesfile.title_product_create}</Typography>
        </Grid>

        <Grid item xs={9}>

          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper1} style={{ width: '100%', display: 'inline-block' }}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  onChange={(e) => handlefileupload(e)}
                  showPreviewsInDropzone={false}
                  dropzoneClass={`${classes.dropzonediv} ${productImage.length >= 3 && classes.dropZoneNoneClass}`}
                  previewGridProps={{ container: { spacing: 1, direction: 'row', alignItems: 'flex-start' } }}
                  dropzoneParagraphClass={classes.dropzonetext}
                  previewGridClasses={{
                    container: classes.previewContainer,
                    item: classes.previewItem,
                    image: classes.previewImg,
                  }}
                  previewText=""
                  showPreviews
                  filesLimit={3}
                />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                <div className={classes.boxInnerDiv}>
                  <TextField required size="small" type="text" name="title" label="Name" variant="outlined" value={product.title} onChange={handleInputChange} />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="description" label="description" variant="outlined" value={product.description} onChange={handleInputChange} />
                </div>

              </Paper>
            </Box>

            <Box component="div" className={classes.boxDiv}>
              <Paper elevation={3} className={classes.boxDivPaper}>
                <Grid container xs={12}>
                  <Grid direction="column" item xs={6}>
                    <div className={classes.boxInnerDiv}>
                      <TextField className={classes.customInput} size="small" type="text" name="sku" label="SKU" variant="outlined" value={productDetail.sku} onChange={handleProductDetailInputChange} />
                    </div>
                  </Grid>
                  <Grid direction="column" item xs={6}>
                    <div className={classes.boxInnerDiv}>
                      <TextField className={classes.customInput} size="small" type="text" name="barcode" label="BarCode" variant="outlined" value={productDetail.barcode} onChange={handleProductDetailInputChange} />
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Box component="div" className={classes.boxDiv}>
              <Paper elevation={3} className={classes.boxDivPaper}>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="mrp" label="MRP" variant="outlined" onChange={handelMRPChange} />
                </div>
                {mrp && (
                <>

                  <RadioGroup aria-label="position" name="position" value={discount} onChange={handleDiscountChange} row>
                    <FormControlLabel
                      value="amount"
                      control={<Radio color="primary" />}
                      label="Amount"
                      labelPlacement="end"
                    />

                    <FormControlLabel
                      value="percentage"
                      control={<Radio color="primary" />}
                      label="Percentage"
                      labelPlacement="end"
                    />

                  </RadioGroup>
                  <div className={classes.boxInnerDiv}>
                    <TextField size="small" type="text" name="discount" label="Discount" variant="outlined" onChange={handleDiscountValueChange} />
                  </div>
                </>
                )}
                <div className={classes.boxInnerDiv}>
                  <TextField size="small" value={price} type="text" name="price" label="Price" variant="outlined" onChange={(e) => console.log(e)} />
                </div>

                {/* <FormControlLabel
                  control={<Checkbox checked={taxChecked} onChange={handleTaxChange} size="small" name="checkedA" color="primary" />}
                  label="Tax"
                /> */}

                {/* {taxChecked && (
                <>
                  <Autocomplete
                    size="small"
                    className={classes.categoryClass}
                    id="combo-box-demo"
                    onChange={(event, newValue) => {
                      // console.log(JSON.stringify(newValue, null, ' '));
                      if (newValue) {
                        console.log(newValue.rate);
                        setSelectedTax(newValue.id);
                        // setSlctdTax(newValue.id)
                      }
                    }}
                    options={taxList}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => <TextField {...params} label="Select Tax" variant="outlined" />}
                  />
                </>
                )} */}

              </Paper>
            </Box>

            <Box component="div" className={classes.boxDiv}>
              <Paper elevation={3} className={classes.boxDivPaper}>

                <FormControlLabel
                  control={<Checkbox checked={variantChecked} onChange={handleVariantChange} size="small" name="checkedA" color="primary" />}
                  label="Variant"
                />

                {variantChecked && inputList.map((x, i) => (

                  <>

                    <Grid container item xs={12}>
                      <Grid item xs={3}>
                        <TextField size="small" value={x.optionName} onChange={(e) => handleOptionNameChange(e, i)} type="text" name="optionName" label="Option Name" variant="outlined" />
                      </Grid>
                      <Grid item xs={9}>
                        <div className={classes.boxInnerDiv}>
                          <CreatableSelect
                            className={classes.inputwidth}
                            styles={customStyles}
                            components={components}
                            name="optionValue"
                            options={optionList}
                            // menuIsOpen={false}
                            isMulti
                            onChange={(opt, meta) => handleoptionValueChange(opt, meta, i)}
                          />
                          <div className={classes.boxInnerDivToolTip}>
                            {/* {inputList.length !== 1 && ( */}
                            <IconButton
                              className={classes.formdeleteMargin}
                              color="secondary"
                              aria-label="delete"
                              onClick={() => handleRemoveClick(i)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            {/* )} */}
                          </div>
                        </div>
                      </Grid>

                    </Grid>

                    <Grid container item xs={12} spacing={2}>
                      <div style={{ margin: '8px' }}>
                        {inputList.length - 1 < 2
                        && inputList.length - 1 === i
                        && (
                        <Button
                          variant="outlined"
                          className={clsx(classes.buttonMargin, classes.formMargin)}
                          onClick={handleAddClick}
                          startIcon={<AddIcon />}
                        >
                          {propertiesfile.button_add}
                        </Button>
                        )}
                      </div>
                    </Grid>

                  </>

                ))}

              </Paper>
            </Box>
            {/* {optionValue} */}

            {variantChecked && optionValue.length > 0 && (
            <>
              <Box component="div" className={classes.boxDiv}>
                <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>{propertiesfile.variant}</TableCell>
                        <TableCell>
                          <span className={classes.addMargin}>{propertiesfile.price}</span>
                          {' '}
                        </TableCell>
                        <TableCell>
                          <span className={classes.addMargin}>
                            {propertiesfile.sku}
                            {' '}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={classes.addMargin}>
                            {propertiesfile.barcode}
                            {' '}
                          </span>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {optionValue.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableRow key={index}>
                          <TableCell>
                            {' '}
                            {item.displayName}
                            {' '}
                          </TableCell>
                          <TableCell>
                            {' '}
                            <TextField className={classes.minWidthText} size="small" type="text" name="price" value={item.price} onChange={(e) => handlePriceChange(e, index)} variant="outlined" />
                          </TableCell>
                          <TableCell>
                            {' '}
                            <TextField className={classes.minWidthText} size="small" type="text" name="sku" value={item.sku} onChange={(e) => handleSKUChange(e, index)} variant="outlined" />
                          </TableCell>
                          <TableCell>
                            {' '}
                            <TextField className={classes.minWidthText} size="small" type="text" name="barcode" value={item.barcode} onChange={(e) => handleBarcodeChange(e, index)} variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              className={classes.formdeleteMargin}
                              color="secondary"
                              aria-label="delete"
                              onClick={() => handleRemoveVariantClick(index)}
                            >
                              <DeleteIcon />
                            </IconButton>

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            </>
            )}

          </Grid>

          <Grid item xs={12}>
            <Box component="div" className={classes.boxDiv}>
              <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
                <Box>
                  <Button
                    className={classes.createMargin}
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveProduct}
                  >
                    {' '}
                    {propertiesfile.button_create}

                  </Button>
                  <Button
                    className={classes.cancelMargin}
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
        {/* right side card  */}
        <Grid item xs={3} spacing={1}>
          <Box component="div" className={classes.boxDiv}>
            <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
              <div>
                <Autocomplete
                  size="small"
                  className={classes.categoryClass}
                  id="brand-selection"
                  onChange={(e: object, value: any | null) => {
                    if (value) {
                      console.log(value);
                      setSelectedBrand(value);
                    }
                  }}
                  options={brandList}
                  getOptionLabel={(option: any) => option.title}
                  renderInput={(params) => <TextField {...params} label="Select Brand" variant="outlined" name="brandId" />}
                />
              </div>
              <div>
                <Autocomplete
                  size="small"
                  className={classes.categoryClass}
                  id="productType"
                  onChange={(e: object, value: any | null) => {
                    if (value) {
                      console.log(value);
                      setSelectedProductType(value);
                    }
                  }}
                  options={productTypeList}
                  getOptionLabel={(option: any) => option.title}
                  renderInput={(params) => <TextField {...params} label="Product Type" variant="outlined" />}
                />
              </div>
            </Paper>
          </Box>

          <Box component="div" className={classes.boxDiv} style={{ marginTop: '16px' }}>
            <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>

              <div>
                <Autocomplete
                  size="small"
                  className={classes.categoryClass}
                  id="collection"
                  multiple
                  onChange={(e: object, value: any | null) => {
                    console.log(value);
                    setSelectedCategory(value);
                  }}
                  options={categoryList}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" />}
                />
              </div>
            </Paper>
          </Box>

          <Box component="div" className={classes.boxDiv} style={{ marginTop: '16px' }}>
            <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
              <div className={classes.boxInnerDiv}>
                <CreatableSelect
                  className={classes.tagWidth}
                  styles={customStyles}
                  components={components}
                  isMulti
                  onChange={(opt, meta) => handleTagChange(opt, meta)}
                />
              </div>

            </Paper>
          </Box>
        </Grid>
      </Grid>

    </>
  );
};

export default CreateProductComp;
function priceCalcualtion() {
  throw new Error('Function not implemented.');
}
