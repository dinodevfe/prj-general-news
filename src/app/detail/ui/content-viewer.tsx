import { IArticle, TArticleContent } from '@/models'
import Utilities from '@/utilities'
import { Box, Typography } from '@mui/material'
import React, { Component, FC } from 'react'

interface IProps {
  data: IArticle
}

const ContentViewer: FC<IProps> = (props) => {
  return (
    <Box>
      {props.data.content?.map((item, index) => (
        <Item articleId={props.data.id} origin={props.data.sourceOrigin ?? ''} data={item} key={index} />
      ))}
    </Box>
  )
}
export default ContentViewer

interface IItemProps {
  articleId: string
  origin: string
  data: TArticleContent
}

class Item extends Component<IItemProps> {
  render() {
    const { data, origin } = this.props
    switch (data.type) {
      case 'img':
        return (
          <Box sx={{ width: '100%', margin: '0 auto 9px' }}>
            <Box component='img' src={Utilities.getImageUri(data.text)} alt='picture' sx={{ width: '100%' }} />
            {data.sub && data.sub.toLowerCase() !== 'none' && (
              <Typography variant='body2' sx={{ fontStyle: 'italic', color: '#767676' }}>
                {data.sub}
              </Typography>
            )}
            <Typography variant='body2' sx={{ fontStyle: 'italic', color: '#767676' }}>
              © Được {origin} cung cấp
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

const parseContent = (data?: string): TArticleContent[] => {
  try {
    const res = JSON.parse(data ?? '[]')
    if (Array.isArray(res) && !!res[0].text) return res
    else return []
  } catch (error) {
    console.log(error)
    return []
  }
}
