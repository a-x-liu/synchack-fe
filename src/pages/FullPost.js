import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
// material
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Container, Stack, Typography, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';
import { useState } from 'react';
import axios from 'axios'

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function Blog() {
  const params = useParams();
  const [data, setData] = React.useState({
    account_id: '',
    current_dollar: '',
    description: "",
    dollar_target: '',
    image_url: "",
    is_mission: '',
    is_shared: '',
    pk: '',
    time_created: "2021-08-28T05:49:39Z",
    title: "",
  })

  React.useEffect(async () => {
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/post/get/?post_id=${params.postid}`, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (res) {
      setData(res.data)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])
  
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">View Post</Typography>
        </Box>  
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BlogPostCard post={data} full={true} />
        </div>
      </Container>
    </Page>
  );
}
