'use client'
import React, { Component } from 'react'
import { EArticleType, IArticleDTO } from '@/models'
import { Grid } from '@mui/material'
import CardCarousel from './CardCarousel'
import CardBasic from './CardBasic'
import CardTrends from './CardTrends'
import CardWelcome from './CardWelcome'
import CardMultiple from './CardMultiple'

interface IList {
  nomalIndexs: IArticleDTO[]
  nomals: IArticleDTO[]
  carousels: IArticleDTO[]
  hots: IArticleDTO[]
}

interface IProps {
  data: IArticleDTO[]
}

export default class Content extends Component<IProps> {
  handleData = (): IList => {
    const { data } = this.props
    const temp = data.filter((e) => !e.type || e.type === EArticleType.Normal)
    const index = 6
    return {
      carousels: data.filter((e) => e.type === EArticleType.Carousel),
      hots: data.filter((e) => e.type === EArticleType.Hot),
      nomalIndexs: temp.slice(0, index),
      nomals: temp.slice(index)
    }
  }

  render() {
    const { nomals, nomalIndexs, hots, carousels } = this.handleData()
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardWelcome />
        </Grid>
        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[0]} />
        </Grid>
        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[1]} />
        </Grid>

        <Grid item xs={3}>
          <CardMultiple data={hots} />
        </Grid>
        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[2]} />
        </Grid>
        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[3]} />
        </Grid>
        <Grid item xs={3}>
          <CardTrends />
        </Grid>

        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[4]} />
        </Grid>
        <Grid item xs={6}>
          <CardCarousel data={carousels} key={carousels.length} />
        </Grid>
        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[5]} />
        </Grid>

        {nomals.map((item, index) => (
          <Grid item xs={3} key={index}>
            <CardBasic data={item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}
