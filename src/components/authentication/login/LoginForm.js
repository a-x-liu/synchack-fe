import * as Yup from 'yup';
// import React, {} from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().email('Username must be a valid username').required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const login = async () => {
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/account/login', {
      "username": getFieldProps('userName').value,
      "password": getFieldProps('password').value
    }, null)
    .then(function (response) {
      window.localStorage.setItem('token', response.data.token);
      window.localStorage.setItem('user_id', response.data.user_id);
      window.localStorage.setItem('username', response.data.username);
      window.localStorage.setItem('is_org', response.data.is_org);
      window.localStorage.setItem('profile_pic', response.data.profile_pic);
      window.localStorage.setItem('email', response.data.email);
      window.localStorage.setItem('first', response.data.first_name);
      window.localStorage.setItem('last', response.data.last_name);
      if(response.data.response === "Successful login!"){
        navigate('/dashboard/blog')
      } else {
        navigate('/login')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Username"
            {...getFieldProps('userName')}
            // error={Boolean(touched.userName && errors.userName)}
            // helperText={touched.userName && errors.userName}
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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={login}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
