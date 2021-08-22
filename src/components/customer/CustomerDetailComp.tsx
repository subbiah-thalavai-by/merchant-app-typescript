import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ICustomer {
    id: string;
    firstName: string;
    lastName: string;
    isdCode: string;
    phoneNumber: string;
    email: string;
    emailVerified: boolean;
    marketing: string;
}

interface ICustomerAddress {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    countryCode: string;
    zip: string;
    isdCode: string;
    phoneNumber: string;
}

const defaultCiustomerAdresses: ICustomerAddress[] = [];

const CustomerDetailComp: React.FC = () => {
  const intialCustomerState = {
    id: '',
    firstName: '',
    lastName: '',
    isdCode: '',
    phoneNumber: '',
    email: '',
    emailVerified: false,
    marketing: '',
  };
  const intialCustomerAddressState = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    countryCode: '',
    zip: '',
    isdCode: '',
    phoneNumber: '',
  };
  const [customers, setCustomers] = React.useState<ICustomer>(intialCustomerState);
  const [customersAdress, setCustomersAdress] = React.useState<ICustomerAddress>(intialCustomerAddressState);

  const { id } = useParams<{ id: string }>();
  console.log(id);

  React.useEffect(() => {
    const fetCustomerList = async () => {
      const response = await axios
        .get<ICustomer>(`${process.env.REACT_APP_BASE_URL}customers/${id}`);
      setCustomers(response.data);
      console.log(response.data);
    };

    fetCustomerList();
  }, []);

  return (
    <div>
      <div className=" ">
        <p>Customer Detail page</p>
        <p>
          {' '}
          name:
          {' '}
          {customers.firstName}
          {' '}
          {customers.lastName}
          {' '}
        </p>
        <p>
          {' '}
          phone number :
          {' '}
          {customers.phoneNumber}
          {' '}
        </p>
        <p>
          {' '}
          email :
          {' '}
          {customers.email}
          {' '}
        </p>
      </div>
      <div>
        <a href={`/#/customers/${id}/addresses`}>Customer Address</a>
      </div>
    </div>
  );
};

export default CustomerDetailComp;
