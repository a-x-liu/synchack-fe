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
  ImageList
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
  const [donos, setDonos] = useState(false);
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    amount: '-1',
  });

  const uploadImg = (imageList, addUpdateIndex) => {
    // data for submit
    setThumbnail(imageList);
    console.log(imageList)
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  async function sendPost () {
    const data = {
      'image_url': thumbnail[0].data_url,
      'account_id': 1,
      'title': values.title,
      'description': values.description,
      'is_mission': donos,
      'dollar_target': values.amount,
      'current_dollar': 0,
      // 'is_shared': 1,
    }
    console.log(data)

    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/post/create/', data, {
      headers: {
        authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (response) {
      console.log('here')
      console.log(response)
    }).catch(function (error) {
      console.log('here2')
      console.log(error)
    })
  }

  return (
    <Page title="Create your post!">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Post
          </Typography>
          <Button
            variant="contained"
            // component={RouterLink}
            // to="#"
            onClick={sendPost}
            startIcon={<Icon icon={Send} />}
          >
            Confirm Post
          </Button>
        </Stack>

        <Card style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <SearchStyle
            placeholder="Create a Post Title"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('title')}
          />
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

        {localStorage.getItem('is_org') == "true" ? 
          <FormControlLabel
            control={
              <Checkbox
                checked={donos}
                onChange={() => {
                  if (donos == false) setDonos(true)
                  else setDonos(false)
                }}
                name="checkedB"
                color="primary"
              />
            }
            style={{ marginBottom: '10px' }}
            label="Include Support Target"
          />
          :
          <div></div>
        }

        {donos == true ?
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              // value={values.amount}
              // onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={60}
              type='number'
              onChange={handleChange('amount')}
              style={{ marginBottom: '10px' }}
              />
          </FormControl>
          :
          <div></div>
        }
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
