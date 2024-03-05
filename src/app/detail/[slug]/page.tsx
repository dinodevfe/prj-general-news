'use client'
import { Container, Grid } from '@mui/material'
import React, { Component } from 'react'
import CardMultiple from '../_component/CardMultiple'
import ReadNews from '../_component/ReadNews'

export default class DetailPage extends Component {
  render() {
    console.log(this.props)

    return (
      <Container>
        <Grid container spacing={2} sx={{ pt: '18px', pb: '56px' }}>
          <Grid item xs={9}>
            <ReadNews />
          </Grid>
          <Grid item xs={3}>
            <CardMultiple />
          </Grid>
        </Grid>
      </Container>
    )
  }
}
