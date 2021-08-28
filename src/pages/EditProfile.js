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

export default function EditProfile() {
  const [thumbnail, setThumbnail] = useState('');
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    amount: '0',
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const uploadImg = (imageList, addUpdateIndex) => {
    // data for submit
    setThumbnail(imageList);
    console.log(imageList)
  };
  return(
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Profile
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={Send} />}
          >
            Confirm Changes
          </Button>
        </Stack>

        <Card style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <SearchStyle
              placeholder="First name"
              style={{ marginBottom: '10px' }}
              onChange={handleChange('title')}
            />
            <SearchStyle
              placeholder="Last name"
              style={{ marginBottom: '10px' }}
              onChange={handleChange('title')}
            />
          </Stack>
          {/* <SearchStyle
            placeholder="User name"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('title')}
          /> */}
          <TextField
            id="outlined-multiline-static"
            label="Password"
            // defaultValue="Default Value"
            variant="outlined"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('description')}
          />
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={5}
            // defaultValue="Default Value"
            variant="outlined"
            style={{ marginBottom: '10px' }}
            onChange={handleChange('description')}
          />

        {/* <FormControl fullWidth variant="outlined">
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
        </FormControl> */}
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
                  }}>Change profile picture</span>
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
