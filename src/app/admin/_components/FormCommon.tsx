// eslint-disable jsx-a11y/no-autofocus
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { Typography, Divider, Box, Button, Paper, styled } from '@mui/material'

interface IFormDeleteProps {
  data: IArticleDTO
  onSubmit: (value: IArticleDTO) => void
  onClose: () => void
}

export class FormDelete extends Component<IFormDeleteProps> {
  render() {
    return (
      <CustomPaper elevation={1} sx={{ maxWidth: '350px' }}>
        <Typography variant='h6' fontWeight={600}>
          Are you sure delete?
        </Typography>
        <Typography variant='subtitle1'>Name: {this.getTitle()}</Typography>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
          <Button color='inherit' onClick={this.props.onClose}>
            no
          </Button>
          <Button color='error' onClick={this.handleSubmit} autoFocus>
            yes
          </Button>
        </Box>
      </CustomPaper>
    )
  }

  getTitle = () => {
    const { title, articleId: id } = this.props.data
    if (title !== '') return title
    return id
  }

  handleSubmit = () => {
    this.props.onClose && this.props.onClose()
    this.props.onSubmit && this.props.onSubmit(this.props.data)
  }
}

interface IFormApproveProps {
  data: IArticleDTO
  onSubmit: (value: IArticleDTO) => void
  onClose: () => void
}

export class FormApprove extends Component<IFormApproveProps> {
  render() {
    return (
      <CustomPaper elevation={1} sx={{ maxWidth: '350px' }}>
        <Typography variant='h6' fontWeight={600}>
          Approve valid articles
        </Typography>
        <Typography variant='subtitle1'>{this.getTitle()}</Typography>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
          <Button color='inherit' onClick={this.props.onClose}>
            no
          </Button>
          <Button color='error' onClick={this.handleSubmit} autoFocus>
            yes
          </Button>
        </Box>
      </CustomPaper>
    )
  }

  getTitle = () => {
    const { title, articleId: id } = this.props.data
    if (title !== '') return title
    return id
  }

  handleSubmit = () => {
    this.props.onClose && this.props.onClose()
    this.props.onSubmit && this.props.onSubmit(this.props.data)
  }
}

const CustomPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 18px',
  gap: '8px'
})
