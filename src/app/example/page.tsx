'use client'
import React, { Component } from 'react'
import { Button, Container, Typography } from '@mui/material'
import ArticlesService from './_services/ArticlesService'

interface IProps {}

export default class ExamplePage extends Component<IProps> {
  fetchAddOne = async () => {
    ArticlesService.add('test1')
  }

  onClick = () => {
    this.fetchAddOne()
  }

  render() {
    return (
      <Container>
        {/* <Typography sx={{ my: '24px' }}>connect status{this.props.isConnected}</Typography> */}
        <Button color='primary' variant='contained' onClick={this.onClick}>
          Add one
        </Button>
      </Container>
    )
  }
}
