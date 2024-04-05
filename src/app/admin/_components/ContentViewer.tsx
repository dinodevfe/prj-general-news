import { TContent } from '@/models'
import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

interface IProps {
  data: string
}

export default class ContentViewer extends Component<IProps> {
  render() {
    const contents = parseContent(this.props.data)
    return (
      <Box>
        {contents.map((item, index) => (
          <Item data={item} key={index} />
        ))}
      </Box>
    )
  }
}

interface IItemProps {
  data: TContent
}

class Item extends Component<IItemProps> {
  render() {
    const { data } = this.props
    switch (data.type) {
      case 'img':
        return (
          <Box>
            {/* <Typography variant='body1'>{data.text}</Typography> */}
            <Box component='img' src={data.text} alt='picture' />
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
