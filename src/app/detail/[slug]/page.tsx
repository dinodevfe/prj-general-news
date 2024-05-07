'use client'
import React, { Component } from 'react'
import { IArticleDTO, ISlug } from '@/models'
import { Box, Container, Grid, styled } from '@mui/material'
import CardBasic from '@/components/cards/CardBasic'
import ReadNews from '../_component/ReadNews'
import NewsService from '../_services/NewsService'
import CardMultiple from '../_component/CardMultiple'
import { Adsense } from '../_component/adsense'

interface IProps extends ISlug {}

interface IState {
  data?: IArticleDTO
}

export default class DetailPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {}
  }

  fetchDetail = async (id: string) => {
    // console.log('news id: ', id)
    const res = await NewsService.detail(id)
    if (!res) return
    this.setState({ data: res })
  }

  componentDidMount() {
    const { slug } = this.props.params
    this.fetchDetail(slug)
  }

  // initAds = () => {
  //   var ads = document.getElementsByClassName('adsbygoogle').length
  //   for (var i = 0; i < ads; i++) {
  //     try {
  //       const adsbygoogle = ((window as any).adsbygoogle = (window as any).adsbygoogle || [])
  //       console.log(adsbygoogle)
  //       adsbygoogle.push({})
  //     } catch (e) {}
  //   }
  // }

  render() {
    return (
      <Container>
        <Grid container spacing={2} sx={{ pt: '24px', pb: '56px' }}>
          <Grid item xs={12}>
            <Adsense
              style={{ display: 'block', width: '300px', height: '250px' }}
              client='ca-pub-9643912173816808'
              slot='1480448417'
              format='auto'
              responsive='true'
            ></Adsense>
          </Grid>
          <Grid item xs={8}>
            <ReadNews data={this.state.data} />
          </Grid>
          <Grid item xs={4}>
            <StickyBox>
              <CardMultiple />
            </StickyBox>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '48px' }}>
          {[...Array(8)].map((item, index) => (
            <Grid key={index} item xs={3}>
              <CardBasic />
            </Grid>
          ))}
        </Grid>
        <Box height='128px' />
      </Container>
    )
  }
}

const StickyBox = styled(Box)({
  position: 'sticky',
  top: '175px'
})
