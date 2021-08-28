import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import Heart from '@iconify/icons-eva/heart-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Container } from '@material-ui/core';
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
      setData(res.data)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])
  
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
