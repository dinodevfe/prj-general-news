'use client'
import React, { Component } from 'react'
import { IArticle } from '@/models'
import { Box, Link, Typography, styled } from '@mui/material'
import Image from 'next/image'
import SourceDefault from '@/images/source-logo.jpg'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

interface IProps {
  data?: IArticle
}

export default class MoreInfo extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <AvatarSource>
          <Image alt='source-logo' src={SourceDefault} />
        </AvatarSource>
        <Typography>{this.props.data?.sourceTitle}</Typography>
        <Box flex={1} />
        <CustomLink href={this.props.data?.sourceUrl} target='_blank'>
          <OpenInNewIcon sx={{ color: '#767676' }} />
        </CustomLink>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fafafa',
  borderRadius: '6px',
  padding: '4px 18px'
})

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
