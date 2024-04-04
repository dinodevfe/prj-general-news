import React, { Component } from 'react'
import { IArticleDTO, TContent } from '@/models'
import { Box, Divider, IconButton, Paper, TextField, Typography, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption'

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
        <Box>
          <Typography variant='h6'>Title: {this.props.data.title}</Typography>
          {/* <TextField id='outlined-basic' label='Outlined' variant='outlined' placeholder='Title' /> */}
          <Typography variant='h6'>Author: {this.props.data.author}</Typography>
          {this.renderContent()}
        </Box>
      </Wrapper>
    )
  }

  renderContent = () => {
    const data = this.parseContent(this.props.data.content)
    return (
      <TextField
        defaultValue={data.map((e) => e.text).join('\n')}
        fullWidth
        multiline
        minRows={5}
        label='Outlined'
        variant='outlined'
        placeholder='Content'
      />
    )
  }

  parseContent = (data?: string): TContent[] => {
    try {
      const res = JSON.parse(data ?? '[]')
      if (Array.isArray(res)) return res
      else return []
    } catch (error) {
      console.log(error)
      return []
    }
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

const BtnClose = styled(IconButton)({
  flex: '0 0 auto',
  color: '#3c3c3c',
  marginLeft: 'auto',
  '& svg': { transition: 'all 0.2s' },
  '&:hover svg': { color: '#ff200c' }
})
