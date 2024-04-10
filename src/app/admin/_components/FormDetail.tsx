import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { Box, Button, Divider, IconButton, MenuItem, Paper, Select, Typography, styled } from '@mui/material'
import GlobalModal, { IGlobalModalContext, mapGlobalModalContext } from 'partner-library-mfe/components/GlobalModal'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption'
import { FormApprove, FormDelete } from './FormCommon'
import ContentViewer from './ContentViewer'
import PrioritizeMenu from './PrioritizeMenu'
import { IPrioritizeMenuV2Model, PrioritizeMenuV2 } from './PrioritizeMenuV2'
import { Sleep } from '@/helpers'

interface IProps {
  data: IArticleDTO
  onClose?: () => void
  onSubmit: (data: IArticleDTO) => void
  onDelete: (data: IArticleDTO) => void
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
          <Typography variant='h5' sx={{ m: '12px 0 6px' }}>
            {this.props.data.title}
          </Typography>
          <Typography variant='body1' sx={{ m: '0 0 18px', color: '#767676' }}>
            {this.props.data.description}
          </Typography>
          <ContentViewer data={this.props.data} />
          <Divider sx={{ my: '6px' }} />
          <Box sx={{ display: 'flex' }}>
            <Typography variant='body1' sx={{ mr: '3px' }}>
              Link bài viết góc
            </Typography>
            {this.props.data.originUrl && (
              <Link href={this.props.data.originUrl} target='_blank'>
                tại đây
              </Link>
            )}
            <Box sx={{ flex: 1 }} />
            <Typography variant='body1'>{this.props.data.author}</Typography>
          </Box>
          <Box sx={{ height: '128px' }} />
        </Content>
        <Divider />
        <GlobalModal>{this.renderActions()}</GlobalModal>
      </Wrapper>
    )
  }

  renderActions = () => {
    const data: IPrioritizeMenuV2Model[] = [
      { name: 'Name 1', value: '1' },
      { name: 'Name 2', value: '2' }
    ]
    return mapGlobalModalContext((context) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: '9px 0 6px', gap: '12px' }}>
        <PrioritizeMenuV2
          data={data}
          defaultValue={0}
          onSubmitItem={async () => {
            await Sleep(2000)
          }}
        />
        <Box flex={1} />
        <Button variant='contained' color='error' onClick={() => this.handleClickDelete(context)}>
          Delete
        </Button>
        <Button
          variant='contained'
          onClick={() => this.handleClickApprove(context)}
          disabled={this.props.data.status === 'Approve'}
        >
          Approve
        </Button>
      </Box>
    ))
  }

  handleClickDelete = (context: IGlobalModalContext) => {
    context.showModal({
      content: () => <FormDelete data={this.props.data} onClose={context.closeModal} onSubmit={this.onDelete} />
    })
  }

  handleClickApprove = (context: IGlobalModalContext) => {
    context.showModal({
      content: () => <FormApprove data={this.props.data} onClose={context.closeModal} onSubmit={this.onSubmit} />
    })
  }

  onDelete = () => {
    this.props.onDelete(this.props.data)
    this.props.onClose && this.props.onClose()
  }

  onSubmit = () => {
    if (this.props.data.status === 'Approve') return
    this.props.onSubmit(this.props.data)
    this.props.onClose && this.props.onClose()
  }

  getTitle = () => {
    const { articleId: id, title, sourceTitle } = this.props.data
    return `[${sourceTitle}] ${id} ${title ? ' - ' + title : 'No name'}`
  }
}

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: '12px 12px 0',
  width: 'calc(100vw - 24px)',
  [theme.breakpoints.up('md')]: { width: theme.breakpoints.values.md }
  // [theme.breakpoints.up('lg')]: { width: theme.breakpoints.values.lg },
}))

const Content = styled(Box)({
  maxHeight: 'calc(100vh - 184px)',
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
