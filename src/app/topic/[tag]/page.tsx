'use client'
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { Container, Grid, Stack, Typography, styled, Box, Chip, BoxProps, chipClasses } from '@mui/material'
import CardMultiple from '../_component/CardMultiple'
import CardHorizontal from '../_component/CardHorizontal'
import { getTitleTopic } from '@/components/NavigationBar/config'
import TopicService from '../_services/TopicService'
import { ITopicParams } from '@/app/api/topic/[tag]/route'

interface IProps extends ITopicParams {}

const TagTemp = [{ title: 'Other Category' }, { title: 'Tag 1' }, { title: 'Tag 2' }, { title: 'Tag 3' }]

interface IState {
  data: IArticleDTO[]
}

export default class TopicPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { data: [] }
  }

  fetchDetail = async (id: string) => {
    const res = await TopicService.detail(id)
    if (!res) return
    this.setState({ data: res })
  }

  componentDidMount(): void {
    this.fetchDetail(this.props.params.tag)
  }

  render() {
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
              <Typography variant='h5'>{getTitleTopic(this.props.params.tag)}</Typography>
              <Typography variant='body1' sx={{ color: '#767676' }}>
                Tin tức mới nhất được cập nhật bởi PopularNewspaper
              </Typography>
              <Box component='ul' sx={{ display: 'flex', gap: '9px' }}>
                {TagTemp.map((item, index) => (
                  <ItemTag key={index}>{item.title}</ItemTag>
                ))}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Stack sx={{ gap: '18px' }}>
              {this.state.data.map((item, index) => (
                <CardHorizontal key={index} data={item} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <StickyBox>
              <CardMultiple />
            </StickyBox>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const ItemTag = styled(({ className, children, ...props }: BoxProps) => (
  <Box component='li' className={className} {...props}>
    <Chip size='small' label={children} />
  </Box>
))({
  [`& > .${chipClasses.root}`]: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'rgba(255,255,255,0.9)'
  }
})

const StickyBox = styled(Box)({
  position: 'sticky',
  top: '175px'
})
