'use client'
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { Box, Divider, Link, Stack, Typography, styled } from '@mui/material'
import BasicNewsInfo from '@/components/BasicNewsInfo'
import { ContentSkeleton } from './Skeleton'
import ShareBar from './ShareBar'
import MoreInfo from './MoreInfo'
import ContentViewer from './ContentViewer'

interface IProps {
  data?: IArticleDTO
}

export default class ReadNews extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <Typography variant='h4' component='h1'>
          {this.props.data?.title ?? 'Title'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <BasicNewsInfo data={this.props.data} />
          <Box flex={1} />
          <ShareBar />
        </Box>
        <Divider sx={{ my: '9px' }} />
        {this.renderContent()}
        <Divider sx={{ m: '24px 0 18px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mb: '18px' }}>
          <Typography>Link bài viết góc,</Typography>
          <CustomLink href={this.props.data?.originUrl} target='_blank'>
            tại đây
          </CustomLink>
        </Box>
        <MoreInfo data={this.props.data} />
      </Wrapper>
    )
  }

  renderContent = () => {
    if (!this.props.data) return <ContentSkeleton />
    return <ContentViewer data={this.props.data} />
  }
}

const Wrapper = styled(Box)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  paddingRight: '18px'
})

const CustomLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '6px',
  color: '#000000',
  textDecoration: 'unset',
  fontWeight: 600,
  '&:hover': {
    color: '#0078D4'
  }
})
