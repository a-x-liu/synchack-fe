import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import axios from 'axios';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Profile',
  //   icon: homeFill,
  //   linkTo: '/dashboard/profile',
  // },
  {
    label: 'Feed',
    icon: personFill,
    linkTo: '#'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    console.log('hi')
    console.log(window.localStorage.getItem('token'))
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/account/logout', null, {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
      if(response.data === "Successfully Logged Out"){
        navigate('/login')
      } else {
        navigate('/dashboard/blog')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <RouterLink to={{
          pathname: "/dashboard/profile",
          state: {
            // userId: window.localStorage.getItem('user_id')
            id: "test"
            // "id": 1
          },
        }}>
          <MenuItem
              key={"Profile"}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={homeFill}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24
                }}
              />
              {"Profile"}
            </MenuItem>
        </RouterLink>
        

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
