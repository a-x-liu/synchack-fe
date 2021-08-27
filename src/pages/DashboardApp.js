// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import { useEffect } from 'react';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  // useEffect(async () => {
  //   axios.get('https://zorlvan-enterprise-backend.herokuapp.com/account/profile', {
  //     "user_id": 5
  //   }, null)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, [])
  
  const config = {
    "user_id": 5
  }

  const profile = async () => {

    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Token aa2b99d5ecda0e0fde9d4aa90082aab2331c3c4f' 
    //     // + window.localStorage.getItem('userToken')
    //   },
    //   body: {
    //     "user_id": 7
    //   }
    // }
    // const result = await fetch(`https://zorlvan-enterprise-backend.herokuapp.com/account/profile`, options);
    // if (result.status === 400) {
    //   alert('Invalid input');
    //   return;
    // } else if (result.status === 403) {
    //   alert('Invalid Token');
    //   return;
    // }
    // const resdata = await result.json();
    // console.log(resdata)
    // return resdata;
    
    
    
    // let bodyFormData = new FormData();
    // bodyFormData.set('user_id', 5);
    // bodyFormData.set('password', this.state.password);
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/account/profile?user_id=7`, 
    {
      headers: { 
        Authorization: "Token aa2b99d5ecda0e0fde9d4aa90082aab2331c3c4f"
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
    <Page title="Dashboard | Minimal-UI">
      <button onClick={profile}>Profile</button>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
