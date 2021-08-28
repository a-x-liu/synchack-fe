import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import axios from 'axios'

import Send from '@iconify/icons-eva/paper-plane-fill';

// material
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
  duration
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import USERLIST from '../_mocks_/user';
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import InsertPhotoOutlinedIcon from '@iconify/icons-eva/image-outline';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/styles';

// import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
}));

const ImgUpload = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '10px',
  
  padding: '14px 16.5px 14px 16.5px'
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function User() {
  const classes = useStyles()
  const [thumbnail, setThumbnail] = useState('');
  const [values, setValues] = React.useState({
    'title': '',
    'location': '',
    'description': '',
    'starttime': '',
    'endtime': '',
  });

  const uploadImg = (imageList, addUpdateIndex) => {
    // data for submit
    setThumbnail(imageList);
    console.log(imageList)
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  async function sendPost () {
    const diffTime = new Date(values.endtime) - new Date(values.starttime);
    const diffHrs = Math.ceil(diffTime / (1000 * 60 * 60)); 

    const data = {
      'creator': localStorage.getItem('user_id'),
      'title': values.title,
      'location': values.location,
      'description': values.description,
      'date': values.starttime,
      'duration': diffHrs,
      'event_pic': thumbnail[0].data_url,
    }

    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/event/create/', data, {
      headers: {
        authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }

  return (
    <Page title="Create Event | PhilGreat">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Event
          </Typography>
          <Button
            variant="contained"
            // component={RouterLink}
            // to="#"
            onClick={sendPost}
            startIcon={<Icon icon={Send} />}
          >
            Confirm Event
          </Button>
        </Stack>

        <Card style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <SearchStyle
            placeholder="Create a Event Title"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('title')}
          />
          <SearchStyle
            placeholder="Location"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('location')}
          />
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <TextField
              id="date"
              label="Start Date/Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginRight: '10px' }}
              onChange={handleChange('starttime')}
            />
            <TextField
              id="End Date"
              label="End Date/Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange('endtime')}
            />
          </div>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={10}
            // defaultValue="Default Value"
            variant="outlined"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('description')}
          />

          <ImgUpload>
            <ImageUploading
              value={thumbnail}
              // onChange={thumbnail.length == 0 ? uploadImg : }
              onChange={uploadImg}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper" style={{ marginTop: '0px' }}>
                  <IconButton 
                  // ref={ref} 
                  onClick={onImageUpload}
                  >
                    {<Icon icon={InsertPhotoOutlinedIcon} />}
                  </IconButton>
                  <span style={{
                    position: 'relative',
                    bottom: '0px'
                  }}>Add a Picture</span>
                  {imageList.map((image, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                      <img src={image.data_url} alt="" width="50%" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>Update</button>
                        <button onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </ImgUpload>
        </Card>
      </Container>
    </Page>
  );
}
