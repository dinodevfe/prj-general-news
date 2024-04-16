'use client'
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { Divider, Stack, Typography, styled } from '@mui/material'
import BasicNewsInfo from '@/components/BasicNewsInfo'
import { ContentSkeleton } from './Skeleton'
import MoreInfo from './MoreInfo'
import ContentViewer from './ContentViewer'

interface IProps {
  data?: IArticleDTO
}

export default class ReadNews extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <Typography variant='h5'>{this.props.data?.title ?? 'Title'}</Typography>
        <BasicNewsInfo data={this.props.data} />
        <Divider flexItem />
        {this.renderContent()}
        <Divider flexItem />
        <MoreInfo data={this.props.data} />
      </Wrapper>
    )
  }

  renderContent = () => {
    if (!this.props.data) return <ContentSkeleton />
    // return <Typography dangerouslySetInnerHTML={{ __html: this.props.data?.content ?? 'Content' }}></Typography>
    return <ContentViewer data={this.props.data} />
  }
}

const Wrapper = styled(Stack)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  padding: '18px',
  gap: '9px'
})
