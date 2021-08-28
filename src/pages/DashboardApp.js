// material
// import { Box, Grid, Container, Typography } from '@material-ui/core';
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
import { useLocation, useParams, Link as RouterLink } from 'react-router-dom';
// import {  } from "react-router-dom";
// ----------------------------------------------------------------------
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  ImageList,
  Box
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import Edit from '@iconify/icons-eva/edit-outline';
import EditProfile from './EditProfile';
// DashboardApp.propTypes = {
//   userId: PropTypes.string
// };


export default function DashboardApp() {
  const params = useParams();
  const edit = document.getElementById("editProfileButton");
  if (edit !== null) {
    console.log(params.userId)
    if (params.userId === window.localStorage.getItem('user_id')) edit.style.display = "block";
    else edit.style.display = "none";
  }
  
  // console.log(params)
  // const location = useLocation();
  // if (location !== null) console.log(location)
  // console.log(userId)
  const [profile, setProfile] = useState({});
  // let isFinished = false;
  const [isFinished, setIsFinished] = useState(false);

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
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/post/userposts/?user_id=${params.userId}`, null)
    .then(function (response) {
      console.log(response);
      // setProfile(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [params])
  
  const allowEdit = () => {
    document.getElementById("editProfile").style.display = "none";
    document.getElementById("editInput").style.display = "block";
    document.getElementById("viewProfile").style.display = "none";
    // document.getElementById("title").style.display = "none";
  }

  const finishEdit = () => {
    // isFinished = true;
    setIsFinished(current => !current);
    document.getElementById("editProfile").style.display = "block";
    document.getElementById("editInput").style.display = "none";
    document.getElementById("viewProfile").style.display = "block";
    // document.getElementById("title").style.display = "none";
  }

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
  const[profileData, setProfileData] = useState(0);
  return (
    <Page title={`${profile.username}'s profile`}>
      {/* <button onClick={profile}>Profile</button> */}
      
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}> */}
        <div id="editProfile">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>{profile.username}'s profile</Typography>
              <span id="editProfileButton" style={{ display: "none" }}>
                <Button
                  variant="contained"
                  // component={RouterLink}
                  // to= "/dashboard/editProfile"
                  startIcon={<Icon icon={Edit} />} 
                  onClick={allowEdit}
                >
                  Edit Profile
                </Button>
              </span>
          </Stack>
        </div>

        <div id="editInput" style={{ display: "none" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Edit Profile
              </Typography>
              <Button
                variant="contained"
                // component={RouterLink}
                // to="/"
                startIcon={<Icon icon={Edit} />}
                onClick={finishEdit}
              >
                Confirm Changes
              </Button>
            </Stack>
            <EditProfile profile={profile} isFinished={isFinished}/>
          </div>
         
        {/* </Box>   */}
        <div id="viewProfile">
          <Profile profile={profile}/>
        </div>
        
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
