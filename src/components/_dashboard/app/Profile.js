
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar
} from '@material-ui/core';

Profile.propTypes = {
  profile: PropTypes.object
};

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
  // small: {
  //   width: theme.spacing(3),
  //   height: theme.spacing(3),
  // },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function Profile({ profile }) {
  const info = profile;
  console.log(info);
  const name = info.first_name + " " + info.last_name;
  let profile_pic = ""
  if (info.profile_pic !== null) {
    profile_pic = info.profile_pic;
  } 
  const classes = useStyles();
  return(
    <div>
      <div style={{ width: "400px", margin: "auto", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Avatar alt={name} src={profile_pic} className={classes.large} />
        <h1>{info.username}</h1>
        <h5>{name}</h5>
      </div>
      <div style={{ 
        width: "400px", 
        margin: "30px",
        padding: "10px",
        backgroundColor: "#D4EBD7",
        borderRadius: "10px"
        }} >{info.bio}</div>
    </div>
  )
}