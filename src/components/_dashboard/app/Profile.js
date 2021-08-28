
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  CardContent
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import Send from '@iconify/icons-eva/edit-outline';
import React from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import DonationCard from './DonationCard';

Profile.propTypes = {
  profile: PropTypes.object
};

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
  // small: {
  //   width: theme.spacing(3),
  //   height: theme.spacing(3),
  // },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function Profile({ profile }) {
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);

  /*
  const getMyEvents = async () => {
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/event/userevents?user_id=${window.localStorage.getItem('user_id')}`, {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
      setEvents(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  */
  React.useEffect(async () => {
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/donate/userdonates/?user_id=${window.localStorage.getItem('user_id')}`, {},{})
    .then(function (response) {
      console.log(response);
      setDonations(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
    // const info = profile;
    // // console.log(info);
    // const name = info.first_name + " " + info.last_name;
    // let profile_pic = ""
    // if (info.profile_pic !== null) {
    //   profile_pic = iprofilefo.profile_pic;
    // } 
  }, [])
 
  const classes = useStyles();
  return(
    <div>
      <div style={{ width: "400px", margin: "auto", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Avatar src={profile.profile_pic} className={classes.large} />
        <h1>{profile.username}</h1>
        <h5>{profile.name}</h5>
      </div>
        <Card style={{ position: 'absolute', width: "400px", marginLeft: '10px' }}>
          <CardContent>
            <Typography variant="h6">
              Bio
            </Typography>
            <span style={{ overflowWrap: "break-word" }}>
              {profile.bio}
            </span>
              
            {/* <Typography variant="body2" component="p">
              Thank You for Supporting Us 
            </Typography> */}
          </CardContent>
        </Card>
        <Card style={{ position: 'absolute', width: "400px", marginLeft: '10px', marginTop:'170px' }}>
          <CardContent>
            <Typography variant="h6">
              Your Donations:
            </Typography>
            {donations.map((don, index) => {
              return(<DonationCard key={index} don={don}/>)
            })}

            {/* <Typography variant="body2" component="p">
              Thank You for Supporting Us 
            </Typography> */}
          </CardContent>
        </Card>
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Create Post
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Icon icon={Send} />}
        >
          Edit Profile
        </Button>
      </Stack> */}
    </div>
  )
}