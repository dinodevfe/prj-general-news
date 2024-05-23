'use server'
import React, { FC } from 'react'
import { IArticle } from '@/models'
import { ArticleService } from '@/services'
import { Box, Container, Grid } from '@mui/material'
import { RecommendedArticle } from '../ui/recommended-article'
import ReadNews from '../ui/read-news'
import CardMultiple from '../ui/card-multiple'

interface IDetailParams {
  params: { id: string }
}

interface IProps extends IDetailParams {}

const Page: FC<IProps> = async (props) => {
  const data: IArticle | undefined = await ArticleService.detail(props.params.id)
  const rArticles: IArticle[] = []

  // const [data, setData] = React.useState<IArticle>()
  // const [rArticles, setRArticles] = React.useState<IArticle[]>([])
  // React.useEffect(() => {
  //   const funAsync = async () => {
  //     const [resArticles, resRArticles] = await Promise.all([ArticleService.detail(props.params.id), ArticleService.recommends()])
  //     setData(resArticles)
  //     setRArticles(resRArticles)
  //   }
  //   funAsync()
  //   return () => {}
  // }, [])

  return (
    <Container>
      <Grid container spacing={2} sx={{ pt: '24px', pb: '56px' }}>
        <Grid item xs={8}>
          <ReadNews data={data} />
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ position: 'sticky', top: '175px' }}>
            <CardMultiple />
          </Box>
        </Grid>
      </Grid>
      <RecommendedArticle data={rArticles} />
      <Box height='128px' />
    </Container>
  )
}
export default Page
