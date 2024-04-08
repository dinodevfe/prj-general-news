import { IArticleDTO, TContent } from '@/models'
import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

interface IProps {
  data: IArticleDTO
}

export default class ContentViewer extends Component<IProps> {
  render() {
    const contents = parseContent(this.props.data.content)
    return (
      <Box>
        {contents.map((item, index) => (
          <Item articleId={this.props.data.articleId} origin={this.props.data.sourceTitle} data={item} key={index} />
        ))}
      </Box>
    )
  }
}

interface IItemProps {
  articleId: string
  origin: string
  data: TContent
}

class Item extends Component<IItemProps> {
  render() {
    const { data, articleId, origin } = this.props
    switch (data.type) {
      case 'img':
        const src = `/api/images/${articleId}/${data.text}`
        const copyright = `© Được ${origin} cung cấp`
        return (
          <Box sx={{ width: '100%', margin: '0 auto 9px' }}>
            <Box component='img' src={src} alt='picture' sx={{ width: '100%' }} />
            {data.sub && data.sub.toLowerCase() !== 'none' && (
              <Typography variant='body2' sx={{ fontStyle: 'italic', color: '#767676' }}>
                {data.sub}
              </Typography>
            )}
            <Typography variant='body2' sx={{ fontStyle: 'italic', color: '#767676' }}>
              {copyright}
            </Typography>
          </Box>
        )
      default:
        return (
          <Typography component='p' variant='body1' sx={{ marginBottom: '9px', textAlign: 'justify' }}>
            {data.text}
          </Typography>
        )
    }
  }
}

const parseContent = (data?: string): TContent[] => {
  try {
    const res = JSON.parse(data ?? '[]')
    if (Array.isArray(res) && !!res[0].text) return res
    else return []
  } catch (error) {
    console.log(error)
    return []
  }
}
