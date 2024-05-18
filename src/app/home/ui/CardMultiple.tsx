'use client'
import React, { Component, FC } from 'react'
import { IArticleDTO } from '@/models'
import { Box, BoxProps, Skeleton, Stack, StackProps, Typography, boxClasses, stackClasses, styled } from '@mui/material'
import Image from 'next/image'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SourceDefault from '@/images/source-logo.jpg'
import { formatTimeAgo } from '@/helpers'

interface IProps {
  data: IArticleDTO[]
}

export default class CardMultiple extends Component<IProps> {
  render() {
    return (
      <Box sx={{ width: '100%', pb: '100%', position: 'relative' }}>
        <Wrapper>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>Tin tức hàng đầu</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>{this.renderItems()}</Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {this.renderDots()}
            <Typography variant='caption' sx={{ color: '#0078D4' }}>
              Xem thêm
            </Typography>
          </Box>
        </Wrapper>
      </Box>
    )
  }

  renderItems = () => {
    const data = this.props.data.slice(0, 3)
    if (data.length < 1) return <SkeletonCard />
    return data.map((item, index) => (
      <Box key={index} sx={{ mt: '4px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AvatarSource>
            <Image alt='source-logo' src={SourceDefault} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </AvatarSource>
          <Typography variant='caption' sx={{ color: '#767676' }}>
            {item.sourceTitle ?? 'Unknown'}
          </Typography>
          <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
          <Typography variant='caption' sx={{ color: '#767676' }}>
            {formatTimeAgo(item.dateApproved)}
          </Typography>
        </Box>
        <Title>{item.title ?? 'Title'}</Title>
      </Box>
    ))
  }

  renderDots = () => {
    return (
      <Box component='ul' sx={{ display: 'flex' }}>
        <Box component='li'>
          <FiberManualRecordIcon sx={{ width: '0.3em', height: '0.3em', color: '#767676' }} />
        </Box>
        <Box component='li'>
          <FiberManualRecordIcon sx={{ width: '0.3em', height: '0.3em', color: '#767676' }} />
        </Box>
        <Box component='li'>
          <FiberManualRecordIcon sx={{ width: '0.3em', height: '0.3em', color: '#767676' }} />
        </Box>
      </Box>
    )
  }
}

const SkeletonCard: FC = () => {
  return [...Array(3)].map((e, i) => (
    <Box key={i} sx={{ mt: '9px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Skeleton variant='text' sx={{ fontSize: '1rem', width: '128px' }} />
        <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
        <Skeleton variant='text' sx={{ fontSize: '1rem', width: '76px' }} />
      </Box>
      <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
      <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
    </Box>
  ))
}

const Wrapper = styled(Stack)({
  borderRadius: '6px',
  backgroundColor: '#fafafa',
  // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  padding: '9px'
})

const WrapperV2 = styled(({ className, children, ...props }: BoxProps) => (
  <Box {...props} className={className}>
    <Stack>{children}</Stack>
  </Box>
))({
  width: '100%',
  pb: '100%',
  position: 'relative',
  [`& > .${stackClasses.root}`]: {
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    padding: '9px'
  }
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
