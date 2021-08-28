import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import Heart from '@iconify/icons-eva/heart-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Container, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
// utils
import { fDate } from '../utils/formatTime';
import { fShortenNumber } from '../utils/formatNumber';
//
import SvgIconStyle from '../components/SvgIconStyle';
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SnackBar from '../components/_dashboard/blog/SnackBar';
import Page from '../components/Page';

// ----------------------------------------------------------------------
const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const TitleStyle = styled(Link)({
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

export default function FullEvent() {
  const params = useParams();
  const going = async () => {
    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/participant/attend/', {
      "event_id": params.eventid
    }, {
      headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}
    })
    .then(function (response) {
      console.log(response);
      // document.getElementById('sub'+event['pk']).style.display = 'none'
      // document.getElementById('unsub'+event['pk']).style.display = 'block'
    })
    .catch(function (error) {
      console.log(error);
      
    });
    setGoing(true)
  }
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    'pk': '',
    'creator': '',
    'creator_username': '',
    'profile_pic': '',
    'title': '',
    'location': '',
    'date': new Date(),
    'description': '',
    'duration': 0,
    'event_pic': '',
    'partcipation_count': '',
  })
  const [going2, setGoing] = React.useState(false);

  const POST_INFO = [
    { number: 75030, icon: messageCircleFill },
    { number: data.partcipation_count, icon: eyeFill },
  ];

  React.useEffect(async () => {
    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/event/get/?event_id=${params.eventid}`, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (res) {
      console.log(res)
      setData(res.data)
    }).catch(function (err) {
      console.log(err)
    })

    axios.get(`https://zorlvan-enterprise-backend.herokuapp.com/event/isattending/?event_id=${params.eventid}`, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (res) {
      console.log(res)
      setGoing(res.data.attending)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])

  const cancel = async () => {
    console.log(params.eventid)
    axios.delete("https://zorlvan-enterprise-backend.herokuapp.com/participant/unattend/", 
    {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      },
      data: {
        "event_id": params.eventid
      }
    })
    .then(function (response) {
      console.log(response);
      // document.getElementById('sub'+event['pk']).style.display = 'block'
      // document.getElementById('unsub'+event['pk']).style.display = 'none'
    })
    .catch(function (error) {
      console.log(error);
    });
    setGoing(false)
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  return (
    <Page title="Blog | PhilGreat">
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">View Event</Typography>
        </Box>  
        <div style={{ display: 'flex', justifyContent: 'center' }}>



        <div style={{ marginBottom: '20px', width: "100%", maxWidth: '650px' }}>
        <SnackBar open={open} setOpen={setOpen} />
        <Card>
            <CardMediaStyle>
              <SvgIconStyle
                color="paper"
                src="/static/icons/shape-avatar.svg"
                sx={{
                  width: 80,
                  height: 36,
                  zIndex: 9,
                  bottom: -15,
                  position: 'absolute',
                }}
              />
              <AvatarStyle
                src={data.profile_pic}
              />

              <CoverImgStyle alt={data.title} src={data.event_pic} />
            </CardMediaStyle>
            
            <CardContent sx={{pt: 4,}}>
              <TitleStyle
                color="inherit"
                variant="subtitle2"
                underline="hover"
                // component={RouterLink}
              >
                {data.title}
              </TitleStyle>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                {/* {fDate(data.date)} - {data.creator_username} */}
              </Typography>

                
              <Typography
                gutterBottom
                variant="body2"
                sx={{ display: 'block' }}
              >
                {data.description}
              </Typography>
              
              <InfoStyle>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  {going2 == false ? 
                    <span>
                      <Button
                        variant="contained"
                        onClick={going}
                      >
                        GOING
                      </Button>
                      </span>
                      :
                      <span>
                        <Button
                          variant="contained"
                          onClick={cancel}
                        >
                        CANCEL
                      </Button>
                    </span>
                  }
                  {POST_INFO.map((info, index) => (
                    <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                      }}
                      >
                      {info.icon === shareFill ?
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                        </div>
                        :
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'not-allowed' }}>
                          <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                        </div>
                      }
                    </Box>
                  ))}
                </div>
              </InfoStyle>

            </CardContent>
          </Card>
          </div>




        </div>
      </Container>
    </Page>
  );
}
