'use client'
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { formatTimeAgo } from '@/helpers'
import { Box, Typography, styled } from '@mui/material'
import Image from 'next/image'
import SourceDefault from '@/images/source-logo.jpg'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface IProps {
  data?: IArticleDTO
}

export default class BasicNewsInfo extends Component<IProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <AvatarSource>
          <Image alt='source-logo' src={SourceDefault} />
        </AvatarSource>
        <Typography variant='caption' sx={{ color: '#767676' }}>
          {this.props.data?.title ?? 'Title'}
        </Typography>
        {this.renderAuthor()}
        <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
        <Typography variant='caption' sx={{ color: '#767676' }}>
          {this.props.data && formatTimeAgo(this.props.data.createdDate)}
        </Typography>
      </Box>
    )
  }

  renderAuthor = () => {
    if (!this.props.data?.author) return <></>
    return (
      <>
        <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
        <Typography variant='caption' sx={{ color: '#767676' }}>
          {this.props.data.author}
        </Typography>
      </>
    )
  }
}

const AvatarSource = styled(Box)({
  height: '18px',
  width: '18px',
  borderRadius: '9px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})
