'use client'
import React, { Component } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import PicDefault from '../../../images/image-default.jpg'
import SourceDefault from '../../../images/source-logo.jpg'

export default class CardBasic extends Component {
  render() {
    return (
      <Box sx={{ width: '100%', pb: '100%', position: 'relative' }}>
        <Wrapper>
          <ImageWrapper>
            <Image alt='pic' src={PicDefault} />
          </ImageWrapper>
          <Stack sx={{ gap: '6px', padding: '9px' }}>
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
            <Typography variant='h6'>Title</Typography>
          </Stack>
        </Wrapper>
      </Box>
    )
  }
}

const Wrapper = styled(Box)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0
})

const AvatarSource = styled(Box)({
  height: '18px',
  width: '18px',
  borderRadius: '9px',
  overflow: 'hidden'
})

const ImageWrapper = styled(Box)({
  height: '50%',
  '& > img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  }
})
