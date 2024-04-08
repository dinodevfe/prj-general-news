import { TContent } from '@/models'
import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

interface IProps {
  articleId: string
  data: string
}

export default class ContentViewer extends Component<IProps> {
  render() {
    const contents = parseContent(this.props.data)
    return (
      <Box>
        {contents.map((item, index) => (
          <Item articleId={this.props.articleId} data={item} key={index} />
        ))}
      </Box>
    )
  }
}

interface IItemProps {
  articleId: string
  data: TContent
}

class Item extends Component<IItemProps> {
  render() {
    const { data, articleId } = this.props
    switch (data.type) {
      case 'img':
        const src = `/api/images/${articleId}/${data.text}`
        return (
          <Box>
            {/* <Typography variant='body1'>{data.text}</Typography> */}
            <Box component='img' src={src} alt='picture' sx={{ width: '85%', margin: 'auto', display: 'block' }} />
            <Typography variant='body2'>{data.sub}</Typography>
          </Box>
        )
      default:
        return <Typography variant='body1'>{data.text}</Typography>
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
