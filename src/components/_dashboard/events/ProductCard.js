import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
// material
import { Box, Card, Link, Typography, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import './Events.css'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

EventCard.propTypes = {
  event: PropTypes.object
};

export default function EventCard({ event }) {  
  const going = async () => {
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/participant/attend/', {
      "event_id": event['pk']
    }, {
      headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('sub'+event['pk']).style.display = 'none'
      document.getElementById('unsub'+event['pk']).style.display = 'block'

    })
    .catch(function (error) {
      console.log(error);
      
    });
  }
  const cancel = async () => {
    axios.delete("https://zorlvan-enterprise-backend.herokuapp.com/participant/unattend/", 
    {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      },
      data: {
        "event_id": event['pk']
      }
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('sub'+event['pk']).style.display = 'block'
      document.getElementById('unsub'+event['pk']).style.display = 'none'
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Card>
      {console.log(event)}
      <Box sx={{ pt: '100%', position: 'relative'}}>
        <ProductImgStyle alt={event['description']} src={event['event_pic']} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography className="nice" variant="subtitle2" textAlign={'center'} noWrap>
          {event['creator_username']}'s
        </Typography>
        <RouterLink to={{
            pathname: `/dashboard/viewevent/${event['pk']}`,
          }}>
          <Typography variant="subtitle1" noWrap textAlign={'center'}>
            {event['title']}
          </Typography>
        </RouterLink>
            
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" noWrap>
              ATTENDEES: {event['participant_count']}
            </Typography>
            <span id={'sub'+event['pk']}>
              <Button
                variant="contained"
                onClick={going}
              >
                GOING
              </Button>
              </span>
              <span style={{display: 'none'}}
                id={'unsub'+event['pk']}>
                <Button
                  variant="contained"
                  onClick={cancel}
                >
                CANCEL
              </Button>
              </span>
        </Stack>
      </Stack>
    </Card>
  );
}
