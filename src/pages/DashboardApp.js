// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  // AppTasks,
  // AppNewUsers,
  // AppBugReports,
  // AppItemOrders,
  // AppNewsUpdate,
  // AppWeeklySales,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  // AppCurrentSubject,
  // AppConversionRates,
  Profile
} from '../components/_dashboard/app';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
// ----------------------------------------------------------------------

// DashboardApp.propTypes = {
//   userId: PropTypes.string
// };


export default function DashboardApp() {
  const params = useParams();
  console.log(params)
  const location = useLocation();
  if (location !== null) console.log(location)
  // console.log(userId)
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/account/profile?user_id=${params.userId}`, 
    { 
      headers: { 
        Authorization: "Token " + window.localStorage.getItem('token'),
      }
    })
    .then(function (response) {
      // console.log(response);
      setProfile(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  


  // const profile = async () => {
  //   axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/account/profile?user_id=7`, 
  //   {
  //     headers: { 
  //       Authorization: "Token aa2b99d5ecda0e0fde9d4aa90082aab2331c3c4f"
  //     }
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  return (
    <Page title="Dashboard | Minimal-UI">
      {/* <button onClick={profile}>Profile</button> */}
      
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, this is {profile.username}'s profile</Typography>
        </Box>  


        <Profile profile={profile}/>
        {/* <Grid container spacing={3}>
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
        </Grid> */}
      </Container>
    </Page>
  );
}
