import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
// material
import { Box, Card, Link, Typography, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import Heart from '@iconify/icons-eva/heart-outline';

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

  React.useEffect(async () => {
    axios.get('https://zorlvan-enterprise-backend.herokuapp.com/account/subscribing', {
      headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}
    })
    .then(function (response) {
      console.log(response);
      for(let i = 0; i < response.data.subscribing.length; i++){
        if(pk === response.data.subscribing[i].pk){
          document.getElementById('sub'+pk).style.display = 'none'
          document.getElementById('unsub'+pk).style.display = 'block'
        } 
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  const { bio, email, first_name, is_org, last_name, pk, profile_pic, username,subscriber_count } = product;
  
  const sub = async () => {
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/account/subscribe', {
      "to_account_id": pk
    }, {
      headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('sub'+pk).style.display = 'none'
      document.getElementById('unsub'+pk).style.display = 'block'

    })
    .catch(function (error) {
      console.log(error);
      
    });
  }
  const unsub = async () => {
    axios.delete("https://zorlvan-enterprise-backend.herokuapp.com/account/unsubscribe", 
    {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      },
      data: {
        "to_account_id": pk
      }
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('sub'+pk).style.display = 'block'
      document.getElementById('unsub'+pk).style.display = 'none'
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let colour = "";
  if (profile_pic !== null) colour = getRandomColor();

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative'}} style={{ backgroundColor: colour }}>
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
        {profile_pic ? <ProductImgStyle alt={first_name} src={profile_pic} /> : ""}
       
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
      <RouterLink to={{
          pathname: `/dashboard/profile/${pk}`,
          // state: {
          //   // userId: window.localStorage.getItem('user_id')
          //   id: "test"
          //   // "id": 1
          // },
        }}>
          <Typography variant="subtitle2" noWrap textAlign={'center'}>
            {username}
          </Typography>
        </RouterLink>

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
            <span id={'sub'+pk}>
            <Button
              variant="contained"
              onClick={sub}
              startIcon={<Icon icon={Heart} />}
            >
              Subscribe!
            </Button>
            </span>
            <span style={{display: 'none'}}
              id={'unsub'+pk}>
            <Button
              variant="contained"
              onClick={unsub}
              startIcon={<Icon icon={Heart} />}
            >
              Unsubscribe
            </Button>
            </span>
            <Typography variant="subtitle2" noWrap>
              No. of Subs: {subscriber_count}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
