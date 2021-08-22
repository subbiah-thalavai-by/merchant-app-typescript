import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface ICustomerData {
    firstName: string,
    lastName: string,
    isdCode: string,
    phoneNumber: string,
    email: string,
    emailVerified: boolean,
    marketing: string,
}

const CreateCustomerComp: React.FC = () => {
  const history = useHistory();
  const initialCustomerState = {
    firstName: '',
    lastName: '',
    isdCode: '',
    phoneNumber: '',
    email: '',
    emailVerified: true,
    marketing: 'all',
  };
  const [customer, setCustomer] = useState<ICustomerData>(initialCustomerState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveProductType = () => {
    // const productTypeObj = {
    //   title: productType.title,
    // };

    console.log(customer);

    axios.post(`${process.env.REACT_APP_BASE_URL}customers`, customer)
      .then((res) => history.push('/customers'));
  };

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <input
            placeholder="firstName"
            type="text"
            className="form-control"
            id="firstName"
            required
            value={customer.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="lastName"
            type="text"
            className="form-control"
            id="lastName"
            required
            value={customer.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="isdCode"
            type="text"
            className="form-control"
            id="isdCode"
            required
            value={customer.isdCode}
            onChange={handleInputChange}
            name="isdCode"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="phoneNumber"
            type="text"
            className="form-control"
            id="phoneNumber"
            required
            value={customer.phoneNumber}
            onChange={handleInputChange}
            name="phoneNumber"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="email"
            type="email"
            className="form-control"
            id="email"
            required
            value={customer.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <button type="button" onClick={saveProductType}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateCustomerComp;
