import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import React from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import axios from 'axios';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Button } from '@material-ui/core';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

// ----------------------------------------------------------------------
UserMoreMenu.propTypes = {
  pk: PropTypes.number
};

export default function UserMoreMenu({ pk }) {
  const ref = useRef(null);
  const id = pk
  React.useEffect(async () => {
    axios.get('https://zorlvan-enterprise-backend.herokuapp.com/account/subscribing', {
      headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}
    })
    .then(function (response) {
      console.log(response);
      for(let i = 0; i < response.data.subscribing.length; i++){
        if(id === response.data.subscribing[i].pk){
          document.getElementById('sub'+id).style.display = 'none'
          document.getElementById('unsub'+id).style.display = 'block'
        } 
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  console.log(id)
  const [isOpen, setIsOpen] = useState(false);
  const sub = async () => {
    console.log(id)
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/account/subscribe',
    {
      "to_account_id": id
    }, {
      headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('sub'+pk).style.display = 'none'
      document.getElementById('unsub'+pk).style.display = 'block'


    })
    .catch(function (error) {
      console.log(error);
      
    });
  }
  const unsub = async () => {
    axios.delete("https://zorlvan-enterprise-backend.herokuapp.com/account/unsubscribe", 
    {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      },
      data: {
        "to_account_id": pk
      }
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('sub'+pk).style.display = 'block'
      document.getElementById('unsub'+pk).style.display = 'none'
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // const isFriend = false;
  return (
    <>
    <div>
      <span id={'sub'+id}>
      <IconButton ref={ref} onClick={sub} 
      // style={{ marginRight: '400px'}}
      >
        <PersonAddIcon />
      </IconButton>
      </span>
      <span id={'unsub'+id} style={{display: 'none'}}>
      <IconButton ref={ref} onClick={unsub} 
      // style={{ marginRight: '400px'}}
      >
        <ClearIcon />
      </IconButton>
      </span>
    </div>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
