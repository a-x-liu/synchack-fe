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
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios'
import BlogPostCard from './BlogPostCard';
import trash from '@iconify/icons-eva/trash-2-outline';
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

SharePostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};


export default function SharePostCard({ post, index, full }) {
  const { pk, image_url, title, username, time_created, description, current_dollar, dollar_target, is_mission } = post;
  const { size } = full
  const navigate = useNavigate();

  const POST_INFO = [
    { number: 75030, icon: messageCircleFill },
    { number: 600030, icon: eyeFill },
    { number: 12130, icon: shareFill }
  ];

  return (
    // <Grid item xs={12} style={{ paddingBottom: '20px' }}>
      <Card key={index} sx={{ marginBottom: '20px', width: "100%", maxWidth: '650px' }}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe">
                R
            </Avatar>
            }
            title={username}
            subheader='has shared a post'
        />
        <CardContent sx={{pt: 4,}}>
            <BlogPostCard key={index} post={post} index={index} full={false}/>
        </CardContent>
      </Card>
    // </Grid>
  );
}
