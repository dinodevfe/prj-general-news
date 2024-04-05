import React, { Component } from 'react'
import { IArticleDTO, TContent } from '@/models'
import { Box, Divider, IconButton, Paper, Typography, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption'
import ContentViewer from './ContentViewer'

interface IProps {
  data: IArticleDTO
  onClose?: () => void
}

export default class FormDetail extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '6px' }}>
          <ClosedCaptionIcon color='info' />
          <Typography variant='h6' sx={{ flex: 1 }}>
            {this.getTitle()}
          </Typography>
          <BtnClose onClick={this.props.onClose}>
            <CloseIcon sx={{ color: '#727272' }} />
          </BtnClose>
        </Box>
        <Divider />
        <Content>
          <Typography variant='h6'>Title: {this.props.data.title}</Typography>
          <Typography variant='h6'>Author: {this.props.data.author}</Typography>
          <ContentViewer data={this.props.data.content} />
        </Content>
      </Wrapper>
    )
  }

  getTitle = () => {
    const { id, title, sourceTitle } = this.props.data
    return `[${sourceTitle}] ${id} ${title ? ' - ' + title : 'No name'}`
  }
}

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: '12px 12px 18px',
  width: 'calc(100vw - 24px)',
  [theme.breakpoints.up('md')]: {
    width: theme.breakpoints.values.md
  }
}))

const Content = styled(Box)({
  maxHeight: 'calc(100vh - 128px)',
  overflow: 'auto',
  padding: '0 12px',
  margin: '0 -12px',
  '::-webkit-scrollbar ': { width: '8px', boxShadow: 'unset' },
  '::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '6px' },
  '::-webkit-scrollbar-thumb': { background: '#c2c2c2', borderRadius: '6px' },
  '::-webkit-scrollbar-thumb:hover': { background: '#818181' }
})

const BtnClose = styled(IconButton)({
  flex: '0 0 auto',
  color: '#3c3c3c',
  marginLeft: 'auto',
  '& svg': { transition: 'all 0.2s' },
  '&:hover svg': { color: '#ff200c' }
})
