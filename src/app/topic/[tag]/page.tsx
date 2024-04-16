'use client'
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { Container, Grid, Stack, Typography } from '@mui/material'
import TopicInfo from '../_component/TopicInfo'
import CardMultiple from '../_component/CardMultiple'
import CardHorizontal from '../_component/CardHorizontal'
import SuggestedSource from '../_component/SuggestedSource'
import { getTitleTopic } from '@/components/NavigationBar/config'
import TopicService from '../_services/TopicService'
import { ITopicParams } from '@/app/api/topic/[tag]/route'

interface IProps extends ITopicParams {}

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
          <Grid item xs={3}>
            <Stack sx={{ gap: '18px' }}>
              <TopicInfo title={getTitleTopic(this.props.params.tag)} />
              <SuggestedSource />
              <Typography>{this.state.data.length}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack sx={{ gap: '16px' }}>
              {this.state.data.map((item, index) => (
                <CardHorizontal key={index} data={item} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <CardMultiple />
          </Grid>
        </Grid>
      </Container>
    )
  }
}
