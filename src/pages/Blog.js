import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react'
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
//
import POSTS from '../_mocks_/blog';

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

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px'}}>
        <Typography variant="h4">
          Hi, Welcome Back
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
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
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
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
                Your Top Charities
              </Typography>
              
              <List dense={true}>
                <ListItem style={{paddingLeft: '0px', paddingTop: '0px'}}>
                  <ListItemAvatar>
                    <Avatar>
                      {/* <FolderIcon /> */}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
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

// export default function Blog() {
//   return (
//     <Page title="Dashboard: Blog | Minimal-UI">
//       <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
//         <div style={{ width: '800px' }}>
//           <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
//             <Typography variant="h4" gutterBottom>
//               Yeet
//             </Typography>
//             <BlogPostsSort options={SORT_OPTIONS} />
//           </Stack>
//           <Grid container
//           direction="row"
//           justifyContent="center"
//           alignItems="flex-start"
//           >
//             {/* <Grid container spacing={3} sm={12} md={7} lg={7}
//             direction="row"
//             justifyContent="center"
//             alignItems="center"
//             > */}
//               {POSTS.map((post, index) => (
//                 <BlogPostCard key={post.id} post={post} index={index} />
//               ))}
//             {/* </Grid> */}
//             {/* <Grid item spacing={3} sm={12} md={5} lg={5}
//             alignItems="center"
//             position= "sticky"
//             top="0"
//             >
//               <div style={{ display: 'flex', direction:"row", justifyContent:"center", alignItems:"center" }}>
//                 hello
//                 <Button
//                   variant="contained"
//                   component={RouterLink}
//                   to="#"
//                   startIcon={<Icon icon={plusFill} />}
//                   >
//                   New Post
//                 </Button>
//               </div>
//             </Grid> */}
//           </Grid>
//         </div>
//         <div style={{display: 'flex', flexdirection:"row" }}>
//             <div style={{ position: 'fixed', width: '300px', height: '500px',  backgroundColor: 'aqua'  }}>
//               hello
//               <Button
//                 variant="contained"
//                 component={RouterLink}
//                 to="#"
//                 startIcon={<Icon icon={plusFill} />}
//                 >
//                 New Post
//               </Button>
//             </div>
//         </div>
//       </Container>
//     </Page>
//   );
// }
