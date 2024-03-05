'use client'
import React, { Component } from 'react'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import PicDefault from '@/images/image-default.jpg'
import SourceDefault from '@/images/source-logo.jpg'

export default class CardHorizontal extends Component {
  render() {
    return (
      <Wrapper>
        <Image alt='pic' src={PicDefault} style={{ height: '100%', width: 'auto' }} />
        <Stack sx={{ flex: 1, padding: '0 18px' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AvatarSource>
                <Image alt='source-logo' src={SourceDefault} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </AvatarSource>
              <Typography variant='caption' sx={{ color: '#767676' }}>
                Source title
              </Typography>
              <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
              <Typography variant='caption' sx={{ color: '#767676' }}>
                Time ago
              </Typography>
            </Box>
            <Title>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus purus a magna congue hendrerit sed sit amet
              tortor. Aenean eget sapien eu velit molestie imperdiet a quis nisl. Praesent gravida eget nulla eu molestie.
            </Title>
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
