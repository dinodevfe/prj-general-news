'use client'
import React, { Component } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import PicDefault from '@/images/image-default.jpg'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SourceDefault from '../../../images/source-logo.jpg'
import { IArticleDTO } from '@/models'

const initialData = (max = 3) => {
  const list: string[] = [
    'Mauris ut mi sit amet augue facilisis laoreet eu eu nisl. Aliquam erat volutpat. Integer enim diam, mattis et leo ut, dignissim tristique tellus. Praesent imperdiet risus quam, nec luctus nisi viverra sed.',
    'Ut rhoncus, augue ut ornare lacinia, nunc enim semper velit, non bibendum diam dolor eget augue.',
    'Aenean a ante arcu. Morbi dictum diam nec ex dignissim consectetur. Praesent eget dignissim lectus.'
  ]
  return list
}

export default class CardMultiple extends Component {
  render() {
    const ITEMS = initialData()
    return (
      <Box sx={{ width: '100%', pb: '100%', position: 'relative' }}>
        <Wrapper>
          <Box>
            <Typography sx={{ fontWeight: 'bold', color: '#4C4084', textTransform: 'uppercase' }}>Tin mới</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {ITEMS.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', mt: '9px' }}>
                <Box sx={{ mt: '4px' }}>
                  <Title>{item}</Title>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AvatarSource>
                      <Image
                        alt='source-logo'
                        src={SourceDefault}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </AvatarSource>
                    <Typography variant='caption' sx={{ color: '#767676' }}>
                      Source title
                    </Typography>
                    <FiberManualRecordIcon sx={{ width: '0.35em', height: '0.35em', color: '#767676' }} />
                    <Typography variant='caption' sx={{ color: '#767676' }}>
                      Time ago
                    </Typography>
                  </Box>
                </Box>
                {this.renderImage()}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant='caption' sx={{ color: '#0078D4' }}>
              Xem thêm
            </Typography>
          </Box>
        </Wrapper>
      </Box>
    )
  }

  renderImage = (data?: IArticleDTO) => {
    if (!data) return <Image alt='pic' src={PicDefault} style={{ height: '81px', width: '81px' }} />
    const src = `/api/images/${data.articleId}/${data.imageUrl}`
    return <Box component='img' alt='source-logo' src={src} style={{ height: '81px', width: '81px' }} />
  }
}

const Wrapper = styled(Stack)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  padding: '9px',
  border: '1px solid #EAEAEA'
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
  WebkitBoxOrient: 'vertical'
})
