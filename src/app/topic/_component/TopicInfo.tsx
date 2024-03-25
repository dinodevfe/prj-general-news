'use client'
import React, { Component } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import SourceDefault from '@/images/source-logo.jpg'

interface IProps {
  title: string
}

export default class TopicInfo extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <AvatarSource>
          <Image alt='source-logo' src={SourceDefault} />
        </AvatarSource>
        <Box sx={{ width: '100%', pb: '60%', position: 'relative' }}>
          <Content>
            <Typography variant='h5'>{this.props.title}</Typography>
          </Content>
        </Box>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Stack)({
  alignItems: 'center'
})

const Content = styled(Box)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  padding: '9px',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const AvatarSource = styled(Box)({
  height: '72px',
  width: '72px',
  marginBottom: '-36px',
  borderRadius: '9px',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})
