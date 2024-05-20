'use client'
import React, { FC } from 'react'
import { IArticle } from '@/models'
import { Box, Container, Grid } from '@mui/material'
import ReadNews from '../ui/read-news'
import CardBasic from '../ui/card-basic'
import CardMultiple from '../ui/card-multiple'
import ArticleService from '../services/article.service'

interface IDetailParams {
  params: { id: string }
}

interface IProps extends IDetailParams {}

const Page: FC<IProps> = (props) => {
  // const data = await ArticleService.detail(props.params.id)

  const [data, setdata] = React.useState<IArticle>()

  React.useEffect(() => {
    const funAsync = async () => {
      const res = await ArticleService.detail(props.params.id)
      setdata(res)
    }
    funAsync()
    return () => {}
  }, [])

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

  return (
    <Container>
      <Grid container spacing={2} sx={{ pt: '24px', pb: '56px' }}>
        {/* <Grid item xs={12}>
            <Adsense
              style={{ display: 'block', width: '300px', height: '250px' }}
              client='ca-pub-9643912173816808'
              slot='1480448417'
              format='auto'
              responsive='true'
            ></Adsense>
          </Grid> */}
        <Grid item xs={8}>
          <ReadNews data={data} />
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ position: 'sticky', top: '175px' }}>
            <CardMultiple />
          </Box>
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
export default Page
