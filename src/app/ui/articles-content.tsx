'use client'
import React, { Component } from 'react'
import { EArticlePosition, IArticle } from '@/models'
import { Grid } from '@mui/material'
import CardBasic from './card-basic'
import CardWelcome from './card-welcome'
import CardCarousel from './card-carousel'
import CardMultiple from './card-multiple'

interface IList {
  normalIndexs: IArticle[]
  normals: IArticle[]
  carousels: IArticle[]
  hots: IArticle[]
}

interface IProps {
  data: IArticle[]
}

export default class ArticlesContent extends Component<IProps> {
  handleData = (): IList => {
    const { data } = this.props
    const temp = data.filter((e) => !e.position || e.position === EArticlePosition.Normal)
    const normalCount = 7
    return {
      carousels: data.filter((e) => e.position === EArticlePosition.Carousel),
      hots: data.filter((e) => e.position === EArticlePosition.Hot),
      normalIndexs: temp.slice(0, normalCount),
      normals: temp.slice(normalCount)
    }
  }

  render() {
    const { normals: nomals, normalIndexs: nomalIndexs, hots, carousels } = this.handleData()
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
          {/* <CardBasic data={nomalIndexs[4]} /> */}
          {this.renderAdsense()}
        </Grid>

        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[5]} />
        </Grid>
        <Grid item xs={6}>
          <CardCarousel data={carousels} key={carousels.length} />
        </Grid>
        <Grid item xs={3}>
          <CardBasic data={nomalIndexs[6]} />
        </Grid>
        {this.renderNomals(nomals)}
      </Grid>
    )
  }

  renderAdsense = () => (
    <div className='adsbygoogle-card'>
      <ins
        className='adsbygoogle'
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client='ca-pub-5549525642315117'
        data-ad-slot='9930358465'
        data-ad-format='auto'
        data-full-width-responsive='true'
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  )

  renderNomals = (items: IArticle[]) => {
    const list = items.map((item, index) => (
      <Grid item xs={3} key={index}>
        <CardBasic data={item} />
      </Grid>
    ))
    return insertElements(list, adsIndexs, (index) => (
      <Grid item xs={3} key={`ads-${index}`}>
        {this.renderAdsense()}
      </Grid>
    ))
  }
}

const adsIndexs: number[] = [5]

const insertElements = (
  elements: JSX.Element[],
  positions: number[],
  elementToInsert: (index: number) => JSX.Element
): JSX.Element[] => {
  let newElements = [...elements]
  positions.sort((a, b) => a - b)
  positions.forEach((position, index) => {
    newElements.splice(position + index, 0, elementToInsert(index))
  })
  return newElements
}
