/* eslint-disable radix */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CreatableSelect from 'react-select/creatable';
import { DropzoneArea } from 'material-ui-dropzone';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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
  TableContainer,
} from '@material-ui/core';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { OptionsType } from 'react-select';
import { useDebounce } from 'use-debounce';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
  imageContainerDiv: {

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
  tabletitle: {
    fontSize: '14px',
    paddingBottom: '10px',
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
    tags: Array<string>,
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

const ProductDetailComp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const history = useHistory();
  const classes = useStyles();
  const initialProductState = {
    title: '',
    description: '',
    tags: [],
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
  const [selectedCategory, setSelectedCategory] = useState([] as any);
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
  const [inputList, setInputList] = useState([{ id: '', optionName: '', optionValue: [] as any }]);
  const [optionList, setoptionList] = useState([]);
  const [optionValue, setOptionValue] = useState([{
    displayName: '', name: '', price: '', sku: '',
  }]);
  const [tagValue, setTagValue] = useState([] as any);
  const [selectedTag, setSelectedTag] = useState([] as any);
  const [productImage, setProductImage] = useState([]);

  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);
  const [loadImgDiv, setLoadImgDiv] = useState(false);
  const [productImageList, setProductImageList] = useState([{ src: '' }] as any);
  const [variantData, setvariantData] = useState([] as any);
  // const [intitalBrand, setIntitalBrand] = useState({} as any);
  // const [intitalProductType, setintitalProductType] = useState({} as any);
  // const [intitalCollection, setIntitalCollection] = useState([] as any);
  const [deletedVaraiant, setDeletedVaraiant] = useState([] as any);
  const [deleteOption, setDeleteOption] = useState([] as any);
  const [open, setOpen] = React.useState(false);
  const [variantIndex, setVariantIndex] = React.useState(0);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [optionIndex, setOptionIndex] = React.useState(0);

  const handleVariantDialogClose = () => {
    setOpen(false);
  };
  const handleOptionDialogClose = () => {
    setOptionsOpen(false);
  };

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

    const fetProductTypeList = async () => {
      const response = await axios.get<IProductType[]>(`${process.env.REACT_APP_BASE_URL}product-types`);
      setProductTypeList(response.data);
    };

    const fetchVariant = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}products/${id}/variants`);
      console.log(response.data);
      setvariantData(response.data);
    };

    const fetchOptions = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}products/${id}/options`);
      console.log('options');
      console.log(response.data);
      const selectedOptionsArray: any[] = [];
      // setvariantData(response.data);
      response.data.forEach((item: any) => {
        console.log(item.title);
        console.log(item.values);
        const optionValueArray: any[] = [];
        item.values.forEach((value: any) => {
          const valueObj = { value, label: value, __isNew__: true };
          optionValueArray.push(valueObj);
        });
        const optionObj = { id: item.id, optionName: item.title, optionValue: optionValueArray };
        console.log(optionObj);
        selectedOptionsArray.push(optionObj);
      });
      if (selectedOptionsArray.length > 0) {
        setInputList(selectedOptionsArray);
      }
    };

    const fetchProductData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}products/${id}`);
      console.log(response.data);
      const selectedTagValueArray: any[] = [];
      const selectedTagArray: any[] = [];
      if (response.data.tags) {
        response.data.tags.forEach((item: { value: any; }) => {
          console.log(item);
          const obj = { value: '', label: '', __isNew__: true } as any;
          obj.value = item;
          obj.label = item;
          selectedTagValueArray.push(item);
          selectedTagArray.push(obj);
        });
        // console.log('------------------------tag data-----------------------------');
        // console.log(selectedTagArray);
        setSelectedTag(selectedTagArray);
        setTagValue(selectedTagValueArray);
      }
      setProduct(response.data);
      const brandData = await axios.get(`${process.env.REACT_APP_BASE_URL}brands/${response.data.brandId}`);
      // console.log(brandData.data);
      // setIntitalBrand(brandData.data);
      setSelectedBrand(brandData.data);
      const productTypeData = await axios.get(`${process.env.REACT_APP_BASE_URL}product-types/${response.data.productTypeId}`);

      // console.log(productTypeData.data);
      // setintitalProductType(productTypeData.data);
      setSelectedProductType(productTypeData.data);
      const sampleCollectionIDs = ['dcf3c7dd-f9a2-4417-ae7b-c0165b07b65d', 'cf449de2-ea21-4c39-81d3-f9e98c1c16af', '266405fa-5f27-433f-a1e9-8be769abdef1'];
      const categoriesIds: any[] = [];
      if (sampleCollectionIDs) {
        sampleCollectionIDs.forEach(async (item: any) => {
          // console.log('------------------------collection data-----------------------------');
          // console.log(item);
          const collectionData = await axios.get(`${process.env.REACT_APP_BASE_URL}collections/${item}`);
          // .then((response) => {
          // console.log(collectionData.data);
          categoriesIds.push(collectionData.data);
          // });
        });
      }
      // setIntitalCollection(categoriesIds);
      const collectionData = await axios.get(`${process.env.REACT_APP_BASE_URL}collections`);
      // console.log([collectionData.data[0]]);
      // console.log('------------------------collection data-----------------------------');
      // console.log(categoriesIds);
      setSelectedCategory(categoriesIds);
      setVariantChecked(response.data.hasVariants);
    };

    fetchtBrandList();
    fetCategoryList();
    fetProductTypeList();
    fetchProductImage();
    fetchVariant();
    fetchProductData();
    fetchOptions();
  }, []);
  // }, [productImageList, intitalCollection, selectedTag]);

  const fetchProductImage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}products/${id}/images`);
    setProductImageList(response.data);
  };

  // handle click event of the Remove button
  const handleOptionRemoveClick = () => {
    const list = [...inputList];
    if (list[optionIndex].id != '') {
      setDeleteOption([...deleteOption, list[optionIndex].id]);
    }

    list.splice(optionIndex, 1);
    setInputList(list);
    const updatedState: any[] = [];

    // setInputList(list);

    // console.log(list);

    console.log(updatedState);

    const res: any[] = [];

    if (list.length > 0) {
      const option1Arry = list[0].optionValue;
      let option2Arry: string | any[] = [];
      let option3Arry: string | any[] = [];
      if (list[1]) {
        option2Arry = list[1].optionValue;
      }
      if (list[2]) {
        option3Arry = list[2].optionValue;
      }

      console.log('--------------------');
      console.log(variantData);

      // const duplicateVariant: any[] = [...variantData];

      for (let i = 0; i < option1Arry.length; i++) {
        if (option2Arry.length > 0) {
          for (let j = 0; j < option2Arry.length; j++) {
            if (option3Arry.length > 0) {
              for (let k = 0; k < option3Arry.length; k++) {
                const obj = {} as any;
                const newTitle = `${option1Arry[i].value} / ${option2Arry[j].value} / ${option3Arry[k].value}`;
                const filteredVariant = variantData.filter((e: any) => e.title == newTitle);
                obj.id = filteredVariant.length > 0 ? filteredVariant[0].id : '';
                obj.title = newTitle;
                obj.name = option1Arry[i].value + option2Arry[j].value + option3Arry[k].value;
                obj.price = filteredVariant.length > 0 ? filteredVariant[0].price : '';
                obj.comparePrice = filteredVariant.length > 0 ? filteredVariant[0].comparePrice : '';
                obj.sku = filteredVariant.length > 0 ? filteredVariant[0].sku : '';
                obj.barcode = filteredVariant.length > 0 ? filteredVariant[0].barcode : '';
                res.push(obj);
              }
            } else {
              const obj = {} as any;
              const newTitle = `${option1Arry[i].value} / ${option2Arry[j].value}`;
              const filteredVariant = variantData.filter((e: any) => e.title == newTitle);
              obj.id = filteredVariant.length > 0 ? filteredVariant[0].id : '';
              obj.title = `${option1Arry[i].value} / ${option2Arry[j].value}`;
              obj.name = option1Arry[i].value + option2Arry[j].value;
              obj.price = filteredVariant.length > 0 ? filteredVariant[0].price : '';
              obj.comparePrice = filteredVariant.length > 0 ? filteredVariant[0].comparePrice : '';
              obj.sku = filteredVariant.length > 0 ? filteredVariant[0].sku : '';
              obj.barcode = filteredVariant.length > 0 ? filteredVariant[0].barcode : '';
              res.push(obj);
            }
          }
        } else {
          const obj = {} as any;
          const newTitle = option1Arry[i].value;
          const filteredVariant = variantData.filter((e: any) => e.title == newTitle);
          obj.id = filteredVariant.length > 0 ? filteredVariant[0].id : '';
          obj.title = option1Arry[i].value;
          obj.name = option1Arry[i].value;
          obj.price = filteredVariant.length > 0 ? filteredVariant[0].price : '';
          obj.comparePrice = filteredVariant.length > 0 ? filteredVariant[0].comparePrice : '';
          obj.sku = filteredVariant.length > 0 ? filteredVariant[0].sku : '';
          obj.barcode = filteredVariant.length > 0 ? filteredVariant[0].barcode : '';
          res.push(obj);
        }
      }
      console.log(res);
      setvariantData(res);
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { id: '', optionName: '', optionValue: [] }]);
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

  const handleoptionValueChange = (value: any, actionMeta: any, index: number) => {
    console.log(index);
    console.log(inputList);
    console.log(value);
    console.log(actionMeta);

    // console.log(price);
    const list = [...inputList];
    if (actionMeta.action == 'create-option') {
      const oneList = { ...list[index] };
      oneList.optionValue.push(actionMeta.option);
      list[index] = oneList;
    }

    if (actionMeta.action == 'remove-value') {
      const optionArr = list[index].optionValue;
      // const arrindex = optionArr.indexOf(actionMeta.removedValue);
      const filteredOption = optionArr.filter((e: any) => e.value != actionMeta.removedValue.value);
      // if (arrindex !== -1) {
      //   optionArr.splice(arrindex, 1);
      // }
      list[index].optionValue = filteredOption;
    }

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

    console.log('--------------------');
    console.log(variantData);

    // const duplicateVariant: any[] = [...variantData];

    for (let i = 0; i < option1Arry.length; i++) {
      if (option2Arry.length > 0) {
        for (let j = 0; j < option2Arry.length; j++) {
          if (option3Arry.length > 0) {
            for (let k = 0; k < option3Arry.length; k++) {
              const obj = {} as any;
              const newTitle = `${option1Arry[i].value} / ${option2Arry[j].value} / ${option3Arry[k].value}`;
              const filteredVariant = variantData.filter((e: any) => e.title == newTitle);
              obj.id = filteredVariant.length > 0 ? filteredVariant[0].id : '';
              obj.title = newTitle;
              obj.name = option1Arry[i].value + option2Arry[j].value + option3Arry[k].value;
              obj.price = filteredVariant.length > 0 ? filteredVariant[0].price : '';
              obj.comparePrice = filteredVariant.length > 0 ? filteredVariant[0].comparePrice : '';
              obj.sku = filteredVariant.length > 0 ? filteredVariant[0].sku : '';
              obj.barcode = filteredVariant.length > 0 ? filteredVariant[0].barcode : '';
              res.push(obj);
            }
          } else {
            const obj = {} as any;
            const newTitle = `${option1Arry[i].value} / ${option2Arry[j].value}`;
            const filteredVariant = variantData.filter((e: any) => e.title == newTitle);
            obj.id = filteredVariant.length > 0 ? filteredVariant[0].id : '';
            obj.title = `${option1Arry[i].value} / ${option2Arry[j].value}`;
            obj.name = option1Arry[i].value + option2Arry[j].value;
            obj.price = filteredVariant.length > 0 ? filteredVariant[0].price : '';
            obj.comparePrice = filteredVariant.length > 0 ? filteredVariant[0].comparePrice : '';
            obj.sku = filteredVariant.length > 0 ? filteredVariant[0].sku : '';
            obj.barcode = filteredVariant.length > 0 ? filteredVariant[0].barcode : '';
            res.push(obj);
          }
        }
      } else {
        const obj = {} as any;
        const newTitle = option1Arry[i].value;
        const filteredVariant = variantData.filter((e: any) => e.title == newTitle);
        obj.id = filteredVariant.length > 0 ? filteredVariant[0].id : '';
        obj.title = option1Arry[i].value;
        obj.name = option1Arry[i].value;
        obj.price = filteredVariant.length > 0 ? filteredVariant[0].price : '';
        obj.comparePrice = filteredVariant.length > 0 ? filteredVariant[0].comparePrice : '';
        obj.sku = filteredVariant.length > 0 ? filteredVariant[0].sku : '';
        obj.barcode = filteredVariant.length > 0 ? filteredVariant[0].barcode : '';
        res.push(obj);
      }
    }
    console.log(res);
    setvariantData(res);
  };

  // variant onchange code start

  const handleComparePriceChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const list = [...variantData];
    const oneList = { ...list[index] };
    oneList.comparePrice = value;
    list[index] = oneList;
    setvariantData(list);
  };

  const handlePriceChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const list = [...variantData];
    const oneList = { ...list[index] };
    oneList.price = value;
    list[index] = oneList;
    setvariantData(list);
  };

  const handleSKUChange = (event: any, index: number) => {
    const { name, value } = event.target;
    // console.log(event.target);
    // console.log(name);
    const list = [...variantData];
    const oneList = { ...list[index] };
    oneList.sku = value;
    list[index] = oneList;
    setvariantData(list);
  };

  const handleBarcodeChange = (event: any, index: number) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name);
    const list = [...variantData];
    const oneList = { ...list[index] };
    oneList.barcode = value;
    list[index] = oneList;
    setvariantData(list);
  };

  const handleRemoveVariantOpen = (index: number) => {
    setVariantIndex(index);
    setOpen(true);
  };

  const handleRemoveOptionOpen = (index: number) => {
    setOptionIndex(index);
    setOptionsOpen(true);
  };

  const handleRemoveVariantClick = () => {
    setOpen(false);
    // alert(variantIndex);
    console.log(variantData[variantIndex]);
    const { title } = variantData[variantIndex];
    const { id } = variantData[variantIndex];
    const filteredArray = variantData.filter((itm: { title: any; }) => title.indexOf(itm.title) == -1);
    setvariantData(filteredArray);
    setDeletedVaraiant([...deletedVaraiant, id]);
  };

  // variant onchange code end

  const handleTagChange = (option: any, md: any) => {
    console.log(md);
    const tagArray: any[] = [];
    option.forEach((item: { value: any; }) => {
      tagArray.push(item.value);
    });
    // console.log(tagArray);
    setSelectedTag(option);
    setTagValue(tagArray);
  };

  const handlefileupload = (e: any) => {
    // console.log(e);
    // setProductImage(e)
    const productImage = e;
    // console.log(productImage);
    productImage.forEach((item : any, index:any) => {
      setLoadImgDiv(true);
      const currentdate = Date.now();
      const fileStoreRef = storageRef.child(`product_images/${id}/${currentdate}`).put(item);
      fileStoreRef.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          // setProgress(progress);
          fileStoreRef.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
            const obj = {
              src: downloadURL,
              position: 1,
              // width: imageWidth,
              // height: imageHeight,
            };
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}products/${id}/images`, obj);
            setLoadImgDiv(false);
            fetchProductImage();
          });
        });
    });
  };

  const updateProduct = async () => {
    const productData = await updateProductData();
    const optionsData = await updateOptionsData();
    console.log(deleteOption);
    if (deleteOption.length > 0) {
      const deleteoptionsData = await deleteOptionsData();
    }
    // console.log(deletedVaraiant);
    const updateVariant = variantData.filter((e: any) => e.id != '');
    const createVariant = variantData.filter((e: any) => e.id == '');
    const updatevariantData = await UpdateVariantData(updateVariant);
    console.log(createVariant);
    const createvariantData = await AddVariantData(createVariant);
    if (deletedVaraiant.length > 0) {
      const deleteVariantData = await DeleteVariantData(deletedVaraiant);
    }
    alert('product saved succefully');
    // history.push('/products');
  };

  const updateProductData = async () => {
    const categoriesIds: string[] = [];
    selectedCategory.forEach((element: any) => {
      categoriesIds.push(element.id);
    });
    const productObj = {
      title: product.title,
      description: product.description,
      brandId: selectedBrand.id,
      productTypeId: selectedProductType.id,
      collectionIds: categoriesIds,
      tags: tagValue,
      hasVariants: variantChecked,
    };
    console.log(productObj);
    // const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}products/${id}`, productObj);
    // console.log(response.data.id);
    console.log('product updated');
    // return response.data.id;
  };

  const updateOptionsData = async () => {
    if (!variantChecked) {
      inputList[0].optionName = 'default';
    }
    inputList.forEach((option, index) => {
      const valuearray: any[] = [];
      option.optionValue.forEach((item: any) => {
        valuearray.push(item.value);
      });
      const optionobj = {
        title: option.optionName,
        values: valuearray,
      };
      console.log(optionobj);
      if (option.id == '') {
        const response = axios.post(`${process.env.REACT_APP_BASE_URL}products/${id}/options`, optionobj);
        console.log('post');
      } else {
        const response = axios.patch(`${process.env.REACT_APP_BASE_URL}products/${id}/options/{option.id}`, optionobj);
        console.log('update');
      }
      // console.log(response.data)
    });
  };

  const deleteOptionsData = async () => {
    deleteOption.forEach(async (item: any, index: any) => {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}products/${id}/options/${item}`);
      console.log('deleted option');
    });
  };

  const UpdateVariantData = async (variantList: any) => {
    if (variantList.length > 0) {
      variantList.forEach(async (item: any, index: any) => {
        const obj = {
          title: item.title,
          price: item.price,
          comparePrice: item.comparePrice,
          sku: item.sku,
          barcode: item.barcode,
          option1: inputList.length == 1 ? inputList[0].optionName : '',
          option2: inputList.length == 2 ? inputList[1].optionName : '',
          option3: inputList.length == 3 ? inputList[2].optionName : '',
        };
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}products/${id}/variants/${item.id}`, obj);
        console.log('updated');
      });
    }
  };

  const AddVariantData = async (createVariant: any) => {
    if (createVariant.length > 0) {
      createVariant.forEach(async (item: any, index: any) => {
        const obj = {
          title: item.title,
          price: item.price ? parseInt(item.price) : 0,
          sku: item.sku,
          barcode: item.barcode,
          option1: inputList.length == 1 ? inputList[0].optionName : '',
          option2: inputList.length == 2 ? inputList[1].optionName : '',
          option3: inputList.length == 3 ? inputList[2].optionName : '',
        };
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}products/${id}/variants`, obj);
        console.log('created');
      });
    } else {
      // const obj = {
      //   title: 'default',
      //   price,
      //   comparePrice: mrpvalue,
      //   sku: productDetail.sku,
      //   barcode: productDetail.barcode,
      //   position: 1,
      //   option1: 'default',
      //   productId: pid,
      // };
      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}products/${pid}/variants`, obj);
    }
  };

  const DeleteVariantData = async (deleteVariant: any) => {
    deleteVariant.forEach(async (item: any, index: any) => {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}products/${id}/variants/${item}`);
      console.log('deleted');
    });
  };

  const handleDeleteIconClicks = async (imageId: any) => {
    console.log(imageId.id);
    console.log(id);
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}products/${id}/images/${imageId.id}`);
    fetchProductImage();
  };

  // const handleVariantClick = async (variantId: any) => {
  //   // console.log(id)
  //   history.push(`/products/${id}/variants/${variantId.id}`);
  // };

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
          <Typography component="div" className={classes.pageTitle}>{propertiesfile.title_product_detail}</Typography>
        </Grid>

        <Grid item xs={9}>

          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper1} style={{ width: '100%', display: 'inline-block' }}>
                <DropzoneArea
                  key={debounceKey}
                  acceptedFiles={['image/*']}
                  onChange={(e) => handlefileupload(e)}
                  showPreviewsInDropzone={false}
                  dropzoneClass={`${classes.dropzonediv} ${productImageList.length >= 3 && classes.dropZoneNoneClass}`}
                  previewGridProps={{ container: { spacing: 1, direction: 'row', alignItems: 'flex-start' } }}
                  dropzoneParagraphClass={classes.dropzonetext}
                  previewGridClasses={{
                    container: classes.previewContainer,
                    item: classes.previewItem,
                    image: classes.previewImg,
                  }}
                  previewText=""
                  showPreviews={false}
                  filesLimit={1}
                />
                <div className={classes.imageContainerDiv}>
                  {productImageList && productImageList.map((image: any) => (
                    <>
                      <div className={classes.previewImgDiv}>
                        <div>
                          <img alt="img" className={classes.uploadedImage} src={image.src} />
                        </div>

                        <IconButton className={classes.deleteImgBtn} name="details" onClick={(_e) => handleDeleteIconClicks(image)}>
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
                </div>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} justify="flex-start">
            <Box component="div" className={classes.boxDiv} style={{ width: '100%', display: 'inline-block' }}>
              <Paper elevation={3} className={classes.boxDivPaper} style={{ width: '100%', display: 'inline-block' }}>
                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="title" label="Name" variant="outlined" value={product.title} onChange={handleInputChange} />
                </div>

                <div className={classes.boxInnerDiv}>
                  <TextField size="small" type="text" name="description" label="description" variant="outlined" value={product.description} onChange={handleInputChange} />
                </div>

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
                            value={x.optionValue}
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
                              onClick={() => handleRemoveOptionOpen(i)}
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
                          Add
                        </Button>
                        )}
                      </div>
                    </Grid>

                  </>

                ))}

              </Paper>
            </Box>

          </Grid>

          <Grid item xs={12} className={classes.root}>
            <Box component="div" className={classes.boxDiv}>
              <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)} style={{ padding: '16px' }}>
                <Typography className={classes.tabletitle}> Variant Detail</Typography>
                {/* <TableContainer component={Paper}> */}
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{propertiesfile.variant_name}</TableCell>
                      <TableCell>{propertiesfile.price}</TableCell>
                      <TableCell>{propertiesfile.sku}</TableCell>
                      <TableCell>{propertiesfile.barcode}</TableCell>
                      {/* <TableCell>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {variantData.map((row: any, index:any) => (
                      <TableRow key={row.name}>
                        <TableCell>
                          <a href={`/#/products/${id}/variants/${row.id}`}>{row.title}</a>

                        </TableCell>
                        <TableCell>
                          <TextField className={classes.minWidthText} size="small" type="text" name="price" value={row.price} onChange={(e) => handlePriceChange(e, index)} variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <TextField className={classes.minWidthText} size="small" type="text" name="sku" value={row.sku} onChange={(e) => handleSKUChange(e, index)} variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <TextField className={classes.minWidthText} size="small" type="text" name="barcode" value={row.barcode} onChange={(e) => handleBarcodeChange(e, index)} variant="outlined" />
                        </TableCell>
                        {/* <TableCell>
                            <a onClick={(_e) => handleVariantClick(row)}>
                              {' '}
                              <EditOutlinedIcon />
                              {' '}
                            </a>
                            {' '}
                          </TableCell> */}

                        <TableCell>
                          <IconButton
                            className={classes.formdeleteMargin}
                            color="secondary"
                            aria-label="delete"
                            onClick={() => handleRemoveVariantOpen(index)}
                          >
                            <DeleteIcon />
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* </TableContainer> */}
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
                    type="button"
                    onClick={updateProduct}
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
        {/* right side card  */}
        {/* {intitalBrand.title} */}
        <Grid item xs={3} spacing={1}>
          <Box component="div" className={classes.boxDiv}>
            <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
              <div>
                <Autocomplete
                  value={selectedBrand}
                  size="small"
                  className={classes.categoryClass}
                  id="brand-selection"
                  onChange={(e: object, value: any | null) => {
                    if (value) {
                      // console.log(value);
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
                  value={selectedProductType}
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
                  value={selectedCategory}
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
          {/* {selectedTag[0]} */}
          <Box component="div" className={classes.boxDiv} style={{ marginTop: '16px' }}>
            <Paper elevation={3} className={clsx(classes.boxDivPaper, classes.resposiveTable)}>
              <div className={classes.boxInnerDiv}>
                <CreatableSelect
                  value={selectedTag}
                  // defaultValue={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'blue' }]}
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

      {/* popup code */}

      <div>
        <Dialog
          open={open}
          onClose={handleVariantDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Variant</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the variant ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleVariantDialogClose}>
              Cancel
            </Button>
            <Button size="small" onClick={handleRemoveVariantClick} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={optionsOpen}
          onClose={handleOptionDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Variant</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the option ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleOptionDialogClose}>
              Cancel
            </Button>
            <Button size="small" onClick={handleOptionRemoveClick} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </>
  );
};

export default ProductDetailComp;
function priceCalcualtion() {
  throw new Error('Function not implemented.');
}
