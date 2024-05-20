'use client'
import React, { Component, FC } from 'react'
import { IArticle, NavigationKeys } from '@/models'
import { Box, Skeleton, Stack, Typography, styled } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import PicDefault from '@/images/image-default.jpg'
import SourceDefault from '@/images/source-logo.jpg'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Utilities from '@/utilities'

interface IProps {
  data?: IArticle
}

export default class CardBasic extends Component<IProps> {
  render() {
    if (!this.props.data) return <SkeletonCard />
    return (
      <Box component='article' sx={{ width: '100%', pb: '100%', position: 'relative' }}>
        <Wrapper {...{ component: Link, href: this.getHref(this.props.data.articleId), target: '_blank' }}>
          <ImageWrapper>{this.renderImage()}</ImageWrapper>
          <Stack sx={{ gap: '3px', padding: '9px', height: '94px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AvatarSource>
                <Image alt='source-logo' src={SourceDefault} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </AvatarSource>
              <Typography variant='caption' sx={{ color: '#767676' }}>
                {this.props.data.sourceTitle}
              </Typography>
              <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
              <Typography variant='caption' sx={{ color: '#767676' }}>
                {Utilities.formatTimeAgo(this.props.data.dateApproved)}
              </Typography>
            </Box>
            <Title variant='body1' {...{ component: 'h2' }}>
              {this.props.data.title}
            </Title>
          </Stack>
        </Wrapper>
      </Box>
    )
  }

  getHref = (id: string) => `${NavigationKeys.Detail}/${id}`

  renderImage = () => {
    const { data } = this.props
    if (!data) return <Image alt='pic' src={PicDefault} />
    return <Box className='img-article' component='img' alt='source-logo' src={Utilities.getImageUri(data.imageUrl)} />
  }
}

const SkeletonCard: FC = () => (
  <Box sx={{ width: '100%', pb: '100%', position: 'relative' }}>
    <Wrapper>
      <Skeleton variant='rectangular' width='100%' height='50%' />
      <Stack sx={{ gap: '3px', padding: '9px' }}>
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='rounded' width='100%' height={60} />
      </Stack>
    </Wrapper>
  </Box>
)

const Wrapper = styled(Stack)({
  borderRadius: '6px',
  backgroundColor: '#fafafa',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  cursor: 'pointer',
  textDecoration: 'unset',
  color: '#000',
  overflow: 'hidden',
  transition: 'linear 0.2s',
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px'
  },
  '&:hover .img-article': {
    transform: 'scale(1.05)'
  }
})

const AvatarSource = styled(Box)({
  height: '18px',
  width: '18px',
  borderRadius: '9px',
  overflow: 'hidden'
})

const ImageWrapper = styled(Box)({
  // height: '50%',
  flex: 1,
  overflow: 'hidden',
  '& > img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    transform: 'scale(1)',
    transition: 'all 0.3s'
  }
})

const Title = styled(Typography)({
  flex: 1,
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  fontWeight: 600
})
