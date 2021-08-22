import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const CreateCustomerAddress: React.FC = () => {
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

  const [customersAdress, setCustomersAdress] = React.useState<ICustomerAddress>(intialCustomerAddressState);

  const { id } = useParams<{ id: string }>();
  console.log(id);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    setCustomersAdress({ ...customersAdress, [name]: value });
  };

  const saveCustomerAddress = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/customers/${id}/addresses`, customersAdress)
      .then((res) => alert('customer address save sucessfully'));
    console.log(customersAdress);
  };

  return (
    <div>

      <div>
        <div className="form-group">
          <input
            placeholder="fisrt name"
            type="text"
            className="form-control"
            id="code"
            required
            value={customersAdress.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="last name"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="address1"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.address1}
            onChange={handleInputChange}
            name="address1"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="address2"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.address2}
            onChange={handleInputChange}
            name="address2"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="city"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.city}
            onChange={handleInputChange}
            name="city"
          />
        </div>

        <div className="form-group">
          <input
            placeholder="country"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.country}
            onChange={handleInputChange}
            name="country"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="countryCode"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.countryCode}
            onChange={handleInputChange}
            name="countryCode"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="zip"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.zip}
            onChange={handleInputChange}
            name="zip"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="isdCode"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.isdCode}
            onChange={handleInputChange}
            name="isdCode"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="phoneNumber"
            type="text"
            className="form-control"
            id="rate"
            required
            value={customersAdress.phoneNumber}
            onChange={handleInputChange}
            name="phoneNumber"
          />
        </div>

        <button type="button" onClick={saveCustomerAddress} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateCustomerAddress;
