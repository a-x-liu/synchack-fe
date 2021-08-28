import { useState } from 'react';
import React from 'react';
import axios from 'axios';
// material
import { Container, Stack, Typography } from '@material-ui/core';
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
  React.useEffect(async () => {
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
  }, [])

  return (
    <Page title="Events">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Get involved in with the PhilGood community! 
        </Typography>

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