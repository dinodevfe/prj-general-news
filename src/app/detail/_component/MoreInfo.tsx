'use client'
import React, { Component } from 'react'
import { Box, Link, Typography, styled } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Image from 'next/image'
import SourceDefault from '@/images/source-logo.jpg'
import { IArticleDTO } from '@/models'

interface IProps {
  data?: IArticleDTO
}

export default class MoreInfo extends Component<IProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AvatarSource>
          <Image alt='source-logo' src={SourceDefault} />
        </AvatarSource>
        <Box flex={1} />
        <CustomLink href={this.props.data?.originUrl} target='_blank'>
          <Typography>Link bài viết góc </Typography>
          <OpenInNewIcon />
        </CustomLink>
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

const CustomLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '6px',
  color: '#000000',
  textDecoration: 'unset',
  '&:hover': {
    color: '#0078D4'
  }
})
