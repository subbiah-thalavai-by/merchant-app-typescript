import React from 'react';
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

const defaultCiustomerAdresses: ICustomerAddress[] = [];

const CustomerAdressComp: React.FC = () => {
  const [customersAdresses, setCustomersAdresses]: [ICustomerAddress[], (CustomerAdresses: ICustomerAddress[]) => void] = React.useState(defaultCiustomerAdresses);
  // const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  // const [error, setError]: [string, (error: string) => void] = React.useState('');
  const { id } = useParams<{ id: string }>();
  console.log(id);

  React.useEffect(() => {
    const fetCustomerAddressList = async () => {
      const response = await axios
        .get<ICustomerAddress[]>(`${process.env.REACT_APP_BASE_URL}customers/${id}/addresses`);
      setCustomersAdresses(response.data);
      console.log(response.data);
    };

    fetCustomerAddressList();
  }, []);

  return (
    <div>
      <div>
        <a href={`/#/customers/${id}/addresses/create`}>Create Address</a>
      </div>
      <div>
        {customersAdresses && customersAdresses.map((item) => (
          <div>
            <p>
              {' '}
              First Name :
              {' '}
              {item.firstName}
            </p>

            <p>
              {' '}
              Last Name :
              {' '}
              {item.lastName}
            </p>

            <p>
              {' '}
              Address :
              {' '}
              {item.address1}
              ,
              {' '}
              {item.address2}
            </p>

            <p>
              {' '}
              City :
              {' '}
              {item.city}
            </p>

            <p>
              {' '}
              Country :
              {' '}
              {item.city}
            </p>

            <p>
              {' '}
              Phone Number : +
              {item.isdCode}
              {' '}
              {item.phoneNumber}
            </p>
            <br />
          </div>

        ))}
      </div>
    </div>
  );
};

export default CustomerAdressComp;
