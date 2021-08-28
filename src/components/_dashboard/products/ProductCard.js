import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { bio, email, first_name, is_org, last_name, pk, profile_pic, username } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative'}}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}
        <ProductImgStyle alt={first_name} src={profile_pic} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="/dashboard" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap textAlign={'center'}>
            {username}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle2" noWrap>
            {bio}
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
            </Typography>
            {/* <Typography variant="subtitle2" noWrap>
              No. of Subs: {subscribers}
            </Typography> */}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
