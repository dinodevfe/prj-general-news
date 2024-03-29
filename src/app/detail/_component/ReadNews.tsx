'use client'
import React, { Component } from 'react'
import { INewsDTO } from '@/models'
import { Box, Divider, Stack, Typography, styled } from '@mui/material'
import BasicNewsInfo from '@/components/BasicNewsInfo'
import MoreInfo from './MoreInfo'
import { ContentSkeleton } from './Skeleton'

const DATA: INewsDTO = {
  id: '0',
  title: `Donec eleif imperdiet quam ipsum, nec varius uted nied`,
  sourceTitle: 'News',
  sourceUrl: 'http://source-news-example.com',
  author: 'Author',
  content: '123',
  createdDate: '2024-03-04T02:13:48.822Z'
}

interface IProps {
  data?: INewsDTO
}

export default class ReadNews extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <Typography variant='h5'>{this.props.data?.title ?? 'Title'}</Typography>
        <BasicNewsInfo data={{ title: DATA.sourceTitle, author: DATA.author, createdDate: DATA.createdDate }} />
        <Divider flexItem />
        {this.renderContent()}
        <Divider flexItem />
        <MoreInfo />
      </Wrapper>
    )
  }

  renderContent = () => {
    if (!this.props.data) return <ContentSkeleton />
    return <Typography>{this.props.data?.content ?? 'Content'}</Typography>
  }
}

const Wrapper = styled(Stack)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  padding: '18px',
  gap: '9px'
})
