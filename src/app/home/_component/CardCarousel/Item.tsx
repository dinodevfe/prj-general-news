'use client'
import React, { Component } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import PicDefault from '../../../../images/image-default.jpg'
import SourceDefault from '../../../../images/source-logo.jpg'

export default class Item extends Component {
  render() {
    return (
      <Box>
        <Wrapper>
          <ImageWrapper>
            <Image alt='pic' src={PicDefault} />
          </ImageWrapper>
          <Shadow />
          <Stack sx={{ gap: '6px', padding: '9px', position: 'absolute', bottom: '28px', left: 0, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AvatarSource>
                <Image alt='source-logo' src={SourceDefault} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </AvatarSource>
              <Typography variant='caption' sx={{ color: '#f7f7f7' }}>
                Source title
              </Typography>
              <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#f7f7f7' }} />
              <Typography variant='caption' sx={{ color: '#f7f7f7' }}>
                Time ago
              </Typography>
            </Box>
            <Typography variant='h6' sx={{ color: '#fff' }}>
              Title
            </Typography>
          </Stack>
        </Wrapper>
      </Box>
    )
  }
}

const Wrapper = styled(Box)({
  width: 'calc(100% - 6px)',
  margin: 'auto',
  paddingBottom: 'calc(50% - 8px)',
  position: 'relative',
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px'
})

const ImageWrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  '& > img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  }
})

const AvatarSource = styled(Box)({
  height: '18px',
  width: '18px',
  borderRadius: '9px',
  overflow: 'hidden'
})

const Shadow = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: '6px'
})
