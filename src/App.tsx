/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Layout from './components/layout/Layout';
import LogIn from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ProductTypeComp from './components/product-type/ProductTypeComp';
import CreateProductTypeComp from './components/product-type/CreateProductTypeComp';
import ProductTypeDetailComp from './components/product-type/ProductTypeDetailComp';
import TaxComp from './components/tax/TaxComp';
import TaxCreateComp from './components/tax/CreateTaxComp';
import TaxDetailComp from './components/tax/TaxDetailComp';
import CustomerComp from './components/customer/CustomerComp';
import CustomerDetailComp from './components/customer/CustomerDetailComp';
import CreateCustomerComp from './components/customer/CreateCustomerComp';
import CustomerAdressComp from './components/cutomer-address/CustomerAddressComp';
import CreateCustomerAddress from './components/cutomer-address/CreateCustomerAddressComp';
import CustomerAddressDetailcomp from './components/cutomer-address/CustomerAdressDetailComp';
import BrandComp from './components/brand/BrandComp';
import CreateBrandComp from './components/brand/CreateBrandComp';
import BrandDetailComp from './components/brand/BrandDetailComp';
import CollectionComp from './components/collection/CollectionComp';
import CreateCollectionComp from './components/collection/CreateCollectionComp';
import CollectionDetailComp from './components/collection/CollectionDetailComp';
import CountryComp from './components/country/CountryComp';
import CreateCountryComp from './components/country/CreateCountryComp';
import ContryDetailComp from './components/country/CountryDetailComp';
import ProductComp from './components/product/ProductComp';
import CreateProductComp from './components/product/CreateProductComp';
import ProductDetailComp from './components/product/ProductDetailComp';
import VariantsDetailComp from './components/product/VariantsDetailComp';

import { AuthProvider } from './provider/AuthProvider';

function App(): React.ReactElement {
  return (
    <AuthProvider>
      <IntlProvider locale="en">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Layout>
                <Route exact path="/brands" component={BrandComp} />
                <Route exact path="/brand/create" component={CreateBrandComp} />
                <Route exact path="/brands/:id" component={BrandDetailComp} />
                <Route exact path="/collections" component={CollectionComp} />
                <Route exact path="/collection/create" component={CreateCollectionComp} />
                <Route exact path="/collections/:id" component={CollectionDetailComp} />
                <Route exact path="/countries" component={CountryComp} />
                <Route exact path="/countrie/create" component={CreateCountryComp} />
                <Route exact path="/countries/:id" component={ContryDetailComp} />
                <Route exact path="/products" component={ProductComp} />
                <Route exact path="/product/create" component={CreateProductComp} />
                <Route exact path="/products/:id" component={ProductDetailComp} />
                <Route exact path="/products/:id/variants/:vid" component={VariantsDetailComp} />
                <Route exact path="/product-types" component={ProductTypeComp} />
                <Route exact path="/product-type/create" component={CreateProductTypeComp} />
                <Route exact path="/product-types/:id" component={ProductTypeDetailComp} />
                <Route exact path="/taxes" component={TaxComp} />
                <Route exact path="/taxe/create" component={TaxCreateComp} />
                <Route exact path="/taxes/:id" component={TaxDetailComp} />
                <Route exact path="/customers" component={CustomerComp} />
                <Route exact path="/customer/create" component={CreateCustomerComp} />
                <Route exact path="/customers/:id" component={CustomerDetailComp} />
                <Route exact path="/customers/:id/addresses" component={CustomerAdressComp} />
                <Route exact path="/customers/:id/address/create" component={CreateCustomerAddress} />
                <Route exact path="/customers/:id/addresses/:aid" component={CustomerAddressDetailcomp} />
              </Layout>
            </Switch>
          </div>
        </Router>
      </IntlProvider>
    </AuthProvider>
  );
}

export default App;
