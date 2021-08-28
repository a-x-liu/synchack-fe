import { useFormik } from 'formik';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
// material
import { Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [prod, setProd] = useState([]);
  React.useEffect(async () => {
    axios.get('https://zorlvan-enterprise-backend.herokuapp.com/account/explore', {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
      setProd(response.data.results);
      console.log(prod);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Explore organizations">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Explore various organizations that accept donations, subscriptions and more!
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={prod} />
      </Container>
    </Page>
  );
}
