'use client'
import React, { Component } from 'react'
import { ISlugProps } from '@/models'
import { Container, Grid, Stack } from '@mui/material'
import TopicInfo from '../_component/TopicInfo'
import CardMultiple from '../_component/CardMultiple'
import CardHorizontal from '../_component/CardHorizontal'
import SuggestedSource from '../_component/SuggestedSource'
import { getTitleTopic } from '@/components/NavigationBar/config'

interface IProps extends ISlugProps {}

export default class TopicPage extends Component<IProps> {
  render() {
    return (
      <Container sx={{ pt: '18px', pb: '56px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stack sx={{ gap: '18px' }}>
              <TopicInfo title={getTitleTopic(this.props.params.slug)} />
              <SuggestedSource />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack sx={{ gap: '16px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <CardHorizontal key={index} />
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
