'use client'
import React, { Component } from 'react'
import { formatTimeAgo } from '@/helpers'
import { IArticleDTO, NavigationKeys } from '@/models'
import { Box, Button, Divider, Link, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import PicDefault from '@/images/image-default.jpg'
import SourceDefault from '@/images/source-logo.jpg'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface IProps {
  data?: IArticleDTO
}

export default class CardHorizontal extends Component<IProps> {
  render() {
    if (!this.props.data) return <></>
    return (
      <Wrapper>
        {this.renderImage()}
        <Stack sx={{ flex: 1, padding: '3px 18px', gap: '6px' }}>
          <Divider flexItem />
          <Title {...this.getLinkProps()}>{this.props.data.title}</Title>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AvatarSource>
              <Image alt='source-logo' src={SourceDefault} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </AvatarSource>
            <Typography variant='caption' sx={{ color: '#767676' }}>
              {this.props.data.sourceTitle}
            </Typography>
            <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
            <Typography variant='caption' sx={{ color: '#767676' }}>
              {formatTimeAgo(this.props.data.dateApproved)}
            </Typography>
          </Box>
          <Typography variant='body2' sx={{ color: '#767676' }}>
            {this.props.data.description}
          </Typography>
        </Stack>
      </Wrapper>
    )
  }

  renderImage = () => {
    const { data } = this.props
    if (!data) return <Image alt='pic' src={PicDefault} style={{ height: '100%', width: 'auto' }} />
    const src = `/api/images/${data.articleId}/${data.imageUrl}`
    return (
      <Box sx={{ height: '100%' }} {...this.getLinkProps()}>
        <Box className='img-article' component='img' alt='source-logo' src={src} style={{ height: '100%', width: 'auto' }} />
      </Box>
    )
  }

  getHref = (id?: string) => `${NavigationKeys.Detail}/${id}`

  getLinkProps = () => ({ component: Link, href: this.getHref(this.props.data?.articleId), target: '_blank' })
}

const Wrapper = styled(Box)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  display: 'flex',
  height: '175px',
  textDecoration: 'unset',
  color: '#000'
  // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
})

const AvatarSource = styled(Box)({
  height: '18px',
  width: '18px',
  borderRadius: '9px',
  overflow: 'hidden'
})

const Title = styled(Typography)({
  display: '-webkit-box',
  maxHeight: '3rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  fontWeight: 600,
  color: 'rgba(0,0,0,0.9)',
  textDecoration: 'unset!important',
  transition: 'linear 0.2s',
  '&:hover': {
    color: '#0078D4'
  }
})

// const SkeletonCard: FC = () => {
//   return (
//     <Wrapper>
//       <Skeleton variant='rounded' width={160} height='100%' />
//       <Box sx={{ flex: 1, padding: '0 18px' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//           <Skeleton variant='text' sx={{ fontSize: '1rem', width: '128px' }} />
//           <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
//           <Skeleton variant='text' sx={{ fontSize: '1rem', width: '76px' }} />
//         </Box>
//         <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
//         <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
//       </Box>
//     </Wrapper>
//   )
// }
