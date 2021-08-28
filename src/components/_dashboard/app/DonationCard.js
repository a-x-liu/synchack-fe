import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'
import { useState } from 'react';
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
import Edit from '@iconify/icons-eva/edit-2-fill';
import Delete from '@iconify/icons-eva/close-outline';

// ----------------------------------------------------------------------

// const ProductImgStyle = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute'
// });

// ----------------------------------------------------------------------

DonationCard.propTypes = {
  don: PropTypes.object
};

export default function DonationCard({ don }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { pk, post_id_to, title, amount, start_date, is_recurring, occurence,times_donated } = don;
  
  const edit = async () => {
    axios.put('https://zorlvan-enterprise-backend.herokuapp.com/donate/modify', null, {
      "donate_id": pk,
      "amount": amount,
      "occurence": occurence,
      "is_recurring": is_recurring,

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
  const del = async () => {
    console.log(pk)
    axios.delete("https://zorlvan-enterprise-backend.herokuapp.com/donate/remove/", 
    { 
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`,
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        "donate_id": pk,
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div>
      <Card>
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          To {title},
        </Typography>
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          I started donating from {start_date}
        </Typography>
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          {amount} Dollars!
        </Typography> 
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          {times_donated} many times,
        </Typography>
        <Typography variant="subtitle2" noWrap textAlign={'center'}>
          Every {occurence} days.
        </Typography>
        <Button
                variant="contained"
                onClick={edit}
                startIcon={<Icon icon={Edit} />}
              >
                Edit my donation.
        </Button>
        <Button
                variant="contained"
                onClick={del}
                startIcon={<Icon icon={Delete} />}
              >
                Stop donating :(
        </Button>
      </Card>
      

    </div>
  );
}
