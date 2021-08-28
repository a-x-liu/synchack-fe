import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, OutlinedInput, InputAdornment,
  Checkbox, } from '@material-ui/core';
import Heart from '@iconify/icons-eva/heart-fill';
import { Icon } from '@iconify/react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function PaymentModal({post}) {
  const { image_url, title, username, time_created, description, current_dollar, dollar_target, is_mission, pk, account_id } = post;
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    amount: 0,
    recur: false,
    recurring: 0,
  })
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setInput({ ...input, [prop]: event.target.value });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePayments = async () => {
    let data = {}
    if (input.recur === false) {
      data = {
        'account_id_from': localStorage.getItem("user_id"),
        'post_id_to': pk,
        'amount': input.amount,
        'is_recurring': input.recur,
      }
    } else {
      data = {
        'account_id_from': localStorage.getItem("user_id"),
        'post_id_to': pk,
        'amount': input.amount,
        'is_recurring': input.recur,
        'occurence': input.recurring,
      }
    }
    console.log(data)
    if (data.is_recurring === true && data.recurring_interval == 0) return;
    
    axios.post(`https://zorlvan-enterprise-backend.herokuapp.com/donate/make/`, data, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (res) {
      console.log(res)
      if (res.status === 200) {
        navigate("/dashboard/thankyou")
      } 
    }).catch(function (err) {
      console.log(err)
    })
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          // ...((latestPostLarge || latestPost) && {
            //   color: 'grey.500'
            // })
          }}
          onClick = {handleClickOpen}
          style={{ cursor: 'pointer' }}
          >
        <Box component={Icon} icon={Heart} sx={{ width: 16, height: 16, mr: 0.5 }} />
        <Typography variant="caption">Support</Typography>
      </Box>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Thanks for Your Support
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Any donation amount will go a long way to a good cause. Thank you for your generosity.
          </Typography>
          <FormControl fullWidth variant="outlined" style={{ marginTop: '8px' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              // value={values.amount}
              // onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={100}
              type='number'
              onChange={handleChange('amount')}
              style={{ marginBottom: '10px' }}
              />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={input.recur}
                onChange={() => {
                  if (input.recur === true) setInput({ ...input, 'recur': false });
                  else setInput({ ...input, 'recur': true });
                }}
                name="checkedB"
                color="primary"
              />
            }
            style={{ marginBottom: '10px' }}
            label="I would like to support consistently"
          />
          {input.recur == true ?
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Support Every</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                // value={values.amount}
                onChange={handleChange('recurring')}
                endAdornment={<InputAdornment position="start">Days</InputAdornment>}
                labelWidth={100}
                type='number'
                onChange={handleChange('amount')}
                style={{ marginBottom: '10px' }}
                />
            </FormControl>
            :
            <div></div>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePayments} color="primary">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
