'use client'
import React, { Component, FC } from 'react'
import { IArticleDTO } from '@/models'
import { formatTimeAgo } from '@/helpers'
import { Box, Button, Skeleton, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import PicDefault from '@/images/image-default.jpg'
import SourceDefault from '@/images/source-logo.jpg'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface IProps {
  data?: IArticleDTO
}

export default class CardHorizontal extends Component<IProps> {
  render() {
    if (!this.props.data) return <></>
    return (
      <Wrapper>
        {this.renderImage()}
        <Stack sx={{ flex: 1, padding: '0 18px' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AvatarSource>
                <Image alt='source-logo' src={SourceDefault} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </AvatarSource>
              <Typography variant='caption' sx={{ color: '#767676' }}>
                {this.props.data.sourceTitle}
              </Typography>
              <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
              <Typography variant='caption' sx={{ color: '#767676' }}>
                {formatTimeAgo(this.props.data.dateApproved)}
              </Typography>
            </Box>
            <Title>{this.props.data.title}</Title>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' color='inherit' size='small'>
              Xem thêm
            </Button>
          </Box>
        </Stack>
      </Wrapper>
    )
  }

  renderImage = () => {
    if (!this.props.data) {
      return <Image alt='pic' src={PicDefault} style={{ height: '100%', width: 'auto' }} />
    }
    return <Box component='img' alt='source-logo' src={this.props.data.imageUrl} style={{ height: '100%', width: 'auto' }} />
  }
}

const SkeletonCard: FC = () => {
  return (
    <Wrapper>
      <Skeleton variant='rounded' width={160} height='100%' />
      <Box sx={{ flex: 1, padding: '0 18px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Skeleton variant='text' sx={{ fontSize: '1rem', width: '128px' }} />
          <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem', width: '76px' }} />
        </Box>
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled(Box)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  display: 'flex',
  height: '175px',
  padding: '9px'
})

const AvatarSource = styled(Box)({
  height: '18px',
  width: '18px',
  borderRadius: '9px',
  overflow: 'hidden'
})

const Title = styled(Typography)({
  display: '-webkit-box',
  maxHeight: '3rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
})
