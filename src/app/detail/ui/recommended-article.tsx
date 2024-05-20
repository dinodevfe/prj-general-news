import React, { FC } from 'react'
import { IArticle } from '@/models'
import { Grid } from '@mui/material'
import CardBasic from './card-basic'

interface IProps {
  data: IArticle[]
}

export const RecommendedArticle: FC<IProps> = (props) => {
  const paddedArticles = [...props.data, ...Array(8 - props.data.length).fill(null)]

  return (
    <Grid container spacing={2} sx={{ mt: '48px' }}>
      {paddedArticles.map((item, index) => (
        <Grid key={index} item xs={3}>
          <CardBasic data={item} />
        </Grid>
      ))}
    </Grid>
  )
}
