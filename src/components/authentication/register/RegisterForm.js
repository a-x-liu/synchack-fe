import * as Yup from 'yup';
import { useState, 
  // useEffect 
} from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Checkbox } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
// import { green } from '@material-ui/core/colors';
// import Checkbox from '@material-ui/core/Checkbox';
import ImageUploading from 'react-images-uploading';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';

import axios from 'axios'
// ----------------------------------------------------------------------

const GreenCheckbox = withStyles({
  root: {
    color: "#00AB55",
    '&$checked': {
      color: "#00AB55",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [isOrg, setIsOrg] = useState(false);

  const handleChange = () => {
    setIsOrg(current => !current);
    const personalNames = document.getElementById("personalName");
    const bio = document.getElementById("bioField");
    if (isOrg) {
      personalNames.style.display = "block";
      bio.style.display = "none";
    } 
    else {
      personalNames.style.display = "none"; 
      bio.style.display = "block";
    }
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    userName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('User name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      bio: ''
    },
    validationSchema: RegisterSchema,
    // onSubmit: () => {
    //   navigate('/dashboard', { replace: true });
    // }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // console.log(getFieldProps("bio"))
  

  // useEffect(async () => {
  //   axios.post('https://zorlvan-enterprise-backend.herokuapp.com/account/register', {
  //   "email": getFieldProps("email"),
  //   "username": getFieldProps("userName"),
  //   "password":  getFieldProps("password"),
  //   "first_name": getFieldProps("firstName"),
  //   "last_name": getFieldProps("lastName"),
  //   "profile_pic": "",
  //   "is_org": isOrg,
  //   "bio": "this is a test"
  //   }, null)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, [])

  const register = async () => {
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/account/register', {
      "email": getFieldProps("email").value,
      "username": getFieldProps("userName").value,
      "password":  getFieldProps("password").value,
      "first_name": getFieldProps("firstName").value,
      "last_name": getFieldProps("lastName").value,
      "profile_pic": thumbnail[0].data_url,
      "is_org": isOrg,
      "bio": getFieldProps("bio").value
    }, null)
    .then(function (response) {
      console.log(response);
      if (response.data.response === "Registration successful!") navigate('/login');
      else navigate('/register');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  const uploadImg = (imageList, addUpdateIndex) => {
    // data for submit
    setThumbnail(imageList);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <div id="personalName">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First name"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Last name"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>
          </div>
          <TextField
            fullWidth
            // autoComplete="username"
            // type="userName"
            label="User name"
            {...getFieldProps('userName')}
            error={Boolean(touched.userName && errors.userName)}
            helperText={touched.userName && errors.userName}
          />

          <TextField
            fullWidth
            // autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <div id="bioField" style={{ display: "none" }}>
            <TextField
              fullWidth
              // autoComplete="username"
              // type="email"
              label="Bio"
              multiline
              rows={4}
              {...getFieldProps('bio')}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />
          </div>
          <div style={{ marginLeft: "-10px"}}>
            <GreenCheckbox checked={isOrg} onChange={() => handleChange() } name="isOrg" />
            is organisation
          </div>

          {/* <div>
            <ImageUploading
              multiple
              value={thumbnail}
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
                <div className="upload__image-wrapper" style={{ marginTop: '5%' }}>
                  <IconButton 
                  // ref={ref} 
                  onClick={onImageUpload}
                  >
                    <InsertPhotoOutlinedIcon className='icon' fontSize='large' />
                  </IconButton>
                  <span style={{
                    position: 'relative',
                    bottom: '0px'
                  }}>Add a profile picture</span>
                  {imageList.map((image, index) => (
                    <span key={index} className="image-item">
                      <img src={image.data_url} alt="" width="100" />
                      <span className="image-item__btn-wrapper">
                        <LoadingButton size="small" variant="contained" onClick={() => onImageUpdate(index)}>Update</LoadingButton>
                        <LoadingButton size="small" variant="contained" onClick={() => onImageRemove(index)}>Remove</LoadingButton>
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div> */}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={register}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
