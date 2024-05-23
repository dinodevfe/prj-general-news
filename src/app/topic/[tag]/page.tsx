'use client'
import React, { FC } from 'react'
import { IArticle } from '@/models'
import { Container, Grid, Stack, Typography, Box, Chip } from '@mui/material'
import TopicService from '../services/topic.service'
import CardMultiple from '../ui/CardMultiple'
import CardHorizontal from '../ui/CardHorizontal'
import { ArticleService } from '@/services'

interface ITopicParams {
  params: { tag: string }
}

interface IProps extends ITopicParams {}

const TagTemp = [{ title: 'Other Category' }, { title: 'Tag 1' }, { title: 'Tag 2' }, { title: 'Tag 3' }]

const Page: FC<IProps> = (props) => {
  // const  data = await TopicService.detail(props.params.tag)

  const [data, setdata] = React.useState<IArticle[]>()

  React.useEffect(() => {
    const funAsync = async () => {
      const res = await ArticleService.filterByTag(props.params.tag)
      setdata(res)
    }
    funAsync()
    return () => {}
  }, [])

  return (
    <Container sx={{ pt: '18px', pb: '56px' }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={3}>
            <Stack sx={{ gap: '18px' }}>
              <TopicInfo title={getTitleTopic(this.props.params.tag)} />
              <SuggestedSource />
              <Typography>{this.state.data.length}</Typography>
            </Stack>
          </Grid> */}
        <Grid item xs={12}>
          <Stack sx={{ gap: '9px', alignItems: 'center' }}>
            <Typography variant='body1' sx={{ textTransform: 'uppercase', color: '#767676' }}>
              Thể loại
            </Typography>
            {/* <Typography variant='h5'></Typography> */}
            <Typography variant='body1' sx={{ color: '#767676' }}>
              Tin tức mới nhất được cập nhật bởi PopularNewspaper
            </Typography>
            <Box component='ul' sx={{ display: 'flex', gap: '9px' }}>
              {TagTemp.map((item, index) => (
                <Box component='li' key={index}>
                  <Chip
                    size='small'
                    sx={{ backgroundColor: 'rgba(0,0,0,0.9)', color: 'rgba(255,255,255,0.9)' }}
                    label={item.title}
                  />
                </Box>
              ))}
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack sx={{ gap: '18px' }}>
            {data?.map((item, index) => (
              <CardHorizontal key={index} data={item} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ position: 'sticky', top: '175px' }}>
            <CardMultiple />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Page
