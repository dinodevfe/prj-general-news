'use client'
import React, { Component } from 'react'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import SourceDefault from '@/images/source-logo.jpg'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const List = ['News', 'News ABC', 'ZYX fast', 'Global News']

export default class SuggestedSource extends Component {
  render() {
    return (
      <Wrapper>
        <Typography variant='caption' sx={{ color: '#767676' }}>
          Nguồn tin
        </Typography>
        <Stack component='ul' sx={{ gap: '6px' }}>
          {List.map((item, index) => (
            <Item key={index} {...{ component: 'li' }}>
              <AvatarSource>
                <Image alt='source-logo' src={SourceDefault} />
              </AvatarSource>
              <Typography noWrap flex={1}>
                {item}
              </Typography>
              <OpenInNewIcon fontSize='small' className='open-in-new-icon' />
            </Item>
          ))}
        </Stack>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  padding: '9px'
})

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

const Item = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  borderRadius: '6px',
  padding: '6px 12px',
  transition: '0.3s',
  backgroundColor: 'transparent',
  color: '#000',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f7f7f7'
  },
  '& .open-in-new-icon': {
    transition: '0.3s',
    opacity: 0,
    color: 'rgba(0,0,0,0.54)'
  },
  '&:hover .open-in-new-icon': {
    opacity: 1
  }
})
