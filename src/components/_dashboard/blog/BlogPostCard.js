import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import Heart from '@iconify/icons-eva/heart-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';
import PaymentModal from './PaymentModal';
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
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

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function BlogPostCard({ post, index, full }) {
  const { pk, image_url, title, username, time_created, description, current_dollar, dollar_target, is_mission } = post;
  const { size } = full
  const navigate = useNavigate();
  // const latestPostLarge = index === 0;
  // const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: 75030, icon: messageCircleFill },
    { number: 600030, icon: eyeFill },
    { number: 12130, icon: shareFill }
  ];

  async function handleShare () {
    const data = {
      'title': 'Shared Post',
      'description': 'i aint using this cbs now lol',
      'image_url': '',
      'original_post_id': pk,
      'is_mission': 'false'
    }
    console.log(data)

    axios.post('https://zorlvan-enterprise-backend.herokuapp.com/post/share/', data, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }

  return (
    // <Grid item xs={12} style={{ paddingBottom: '20px' }}>
      <Card key={index} sx={{ marginBottom: '20px', width: "100%", maxWidth: '650px' }}>
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
            // alt={author.name}
            // src={author.avatarUrl}
          />

          <CoverImgStyle alt={title} src={image_url} />
        </CardMediaStyle>

        <CardContent sx={{pt: 4,}}>
          <TitleStyle
            to= {"/dashboard/viewpost/" + pk}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {title}
          </TitleStyle>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(time_created)} - {username}
          </Typography>

            
          <Typography
            gutterBottom
            variant="body2"
            sx={{ display: 'block' }}
          >
            {full ? description : 
              <div>
                {description.slice(0,300)}
                {description.length > 300 ?
                  <span style={{ fontWeight: 'bold', cursor: 'pointer', color: 'grey' }}
                    onClick={() => navigate('/dashboard/viewpost/' + pk)}
                  >
                    ... See More
                  </span>
                  :
                  <div></div>
                }
              </div>
            }
          </Typography>
          
          {is_mission ? 
            <InfoStyle>
              <div style={{ width: '100%', marginBottom: '7px' }}>
                <LinearProgressWithLabel value={current_dollar/dollar_target} />
              </div>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <PaymentModal post={post}/>
                {/* <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                    // ...((latestPostLarge || latestPost) && {
                      //   color: 'grey.500'
                      // })
                    }}
                    >
                  <Box component={Icon} icon={Heart} sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography variant="caption">Support</Typography>
                </Box> */}
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  {POST_INFO.map((info, index) => (
                    <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                      // ...((latestPostLarge || latestPost) && {
                        //   color: 'grey.500'
                        // })
                      }}
                      >
                      {info.icon === shareFill ?
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleShare}>
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
              </div>
            </InfoStyle>
            :
            <InfoStyle>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                {/* <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                    // ...((latestPostLarge || latestPost) && {
                      //   color: 'grey.500'
                      // })
                    marginLeft: '0px',
                    }}
                    >
                  <Box component={Icon} icon={messageCircleFill} sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography variant="caption">Like</Typography>
                </Box> */}
                {/* <div style={{ display: 'flex', justifyContent: 'space-between'}}> */}
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
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleShare}>
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
                {/* </div> */}
              </div>
            </InfoStyle>
          }

        </CardContent>
      </Card>
    // </Grid>
  );
}
