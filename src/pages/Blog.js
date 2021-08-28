import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect } from 'react'
// material
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Container, Stack, Typography, } from '@material-ui/core';
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
import SharePostCard from 'src/components/_dashboard/blog/SharePostCard';
//
import POSTS from '../_mocks_/blog';
import { useState } from 'react';
import axios from 'axios'
import mc from "../images/mc.png"

import UNI from "../images/unicef.png"
import WWE from "../images/wwe.png"

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    minWidth: 300,
  },
});

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

function QuickAccess() {

}

export default function Blog() {
  const classes = useStyles();
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    axios.get('https://zorlvan-enterprise-backend.herokuapp.com/post/feed/', {
      headers: {
        authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (res) {
      // console.log(res.data.results[0].time_created)
      console.log(res)
      setPosts(res.data.posts)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])

  return (
    <Page title="Blog | PhilGreat">
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px'}}>
        <Typography variant="h4">
          Hi, Welcome Back
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard/createpost"
          startIcon={<Icon icon={plusFill} />}
          >
          New Post
        </Button>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={7}
        >
          {posts.map((post, index) => {
            console.log(post)
            if (post.is_shared == null) {
              return(<BlogPostCard key={index} post={post} index={index} full={false}/>)
            } else {
              return(<SharePostCard key={index} post={post} index={index} full={false}/>)
            }
          })}
        </Grid>
        <Grid
          item
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={5}
        >
          <Card className={classes.root} style={{ position: 'fixed', marginLeft: '10px' }}>
            <CardContent>
              <Typography variant="h6">
                Suggested Organisations
              </Typography>
              
              <List dense={true}>
                <ListItem style={{paddingLeft: '0px', paddingTop: '0px'}}>
                  <ListItemAvatar>
                    <Avatar src={mc}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Ronald McDonald"
                  />
                </ListItem>
                <ListItem style={{paddingLeft: '0px', paddingTop: '0px'}}>
                  <ListItemAvatar>
                    <Avatar src={UNI} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Unicef"
                  />
                </ListItem>
                <ListItem style={{paddingLeft: '0px', paddingTop: '0px'}}>
                  <ListItemAvatar>
                    <Avatar src={WWE} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="WWF"
                  />
                </ListItem>
              </List>

              <Typography variant="body2" component="p">
                Thank You for Supporting Us 
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </Page>
  );
}
