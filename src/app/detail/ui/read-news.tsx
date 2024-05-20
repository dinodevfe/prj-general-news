'use client'
import React, { Component } from 'react'
import { IArticle } from '@/models'
import { Box, Divider, Link, Typography, styled } from '@mui/material'
import BasicNewsInfo from '@/app/ui/basic-news-info'
import { ContentSkeleton } from './skeletons'
import ShareBar from './share-bar'
import MoreInfo from './more-info'
import ContentViewer from './content-viewer'

interface IProps {
  data?: IArticle
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
