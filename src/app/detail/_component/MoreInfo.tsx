'use client'
import React, { Component } from 'react'
import { Box, Typography, styled } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Image from 'next/image'
import SourceDefault from '@/images/source-logo.jpg'

export default class MoreInfo extends Component {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AvatarSource>
          <Image alt='source-logo' src={SourceDefault} />
        </AvatarSource>
        <Box flex={1} />
        <Typography>link</Typography>
        <OpenInNewIcon />
      </Box>
    )
  }
}

const AvatarSource = styled(Box)({
  height: '72px',
  width: '72px',
  borderRadius: '36px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})
