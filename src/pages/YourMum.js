import React from 'react'
import axios from 'axios'
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';

export default function YourMum () {

  React.useEffect(async () => {
    axios.post('http://syncshack-backend.herokuapp.com/testing_api/testCreate/', {
      "name": "ur dad",
      "address": "where i was last night"
    }, null)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
    <Page title="Dashboard | Minimal-UI" style={ { backgroundColor: 'grey' } }>
      <Container maxWidth="xl" style={ { backgroundColor: 'red' } }>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Your Mum</Typography>
        </Box>
      </Container>
    </Page>
  )
}