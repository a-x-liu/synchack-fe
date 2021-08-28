import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Container, Stack, Button, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ProductSort,
  EventList,
  ProductFilterSidebar
} from '../components/_dashboard/events';
//

// ----------------------------------------------------------------------

export default function Events() {
  const [events, setEvents] = useState([]);
  const [buttonFilter, setButtonFilter] = useState('ATTENDING EVENTS ONLY');
  
  const changeFilter = () => {
    if (buttonFilter === 'ATTENDING EVENTS ONLY') {
      setButtonFilter('ALL EVENTS')
    } else {
      setButtonFilter('ATTENDING EVENTS ONLY')
    }
    
  }

  const getAllEvents = async () => {
    axios.get('https://zorlvan-enterprise-backend.herokuapp.com/event/all/', {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
      console.log(response.data.results);
      setEvents(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getMyEvents = async () => {
    axios.get('https://zorlvan-enterprise-backend.herokuapp.com/event/userevents/?user_id=' + window.localStorage.getItem('user_id'), {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
      console.log(response.data.results);
      setEvents(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  React.useEffect(() => {
    if (buttonFilter === "ATTENDING EVENTS ONLY") {
      getAllEvents();
    } else {
      console.log('yeet')
      getMyEvents();
    }
  }, [buttonFilter])

  React.useEffect(() => {
    console.log('yeet')
  }, [events])

  React.useEffect(() => {
    getAllEvents();
  }, [])

  return (
    <Page title="Events">
      <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px'}}>
        <Typography variant="h4">
            Get involved in with the PhilGood community! 
        </Typography>
        <Button
          variant="contained"
          onClick={changeFilter}
        >
          {buttonFilter}
        </Button>
      </div>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          </Stack>
        </Stack>
        <EventList events={events} />
      </Container>
    </Page>
  );
}