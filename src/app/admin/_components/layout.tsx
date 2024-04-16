import React, { Component } from 'react'
import { Container, Stack, Typography } from '@mui/material'

interface IProps {
  title: string
  components: {
    content: JSX.Element
  }
}

export default class Layout extends Component<IProps> {
  render() {
    const { title, components } = this.props
    return (
      <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5' sx={{ m: '24px 0 9px' }}>
          {title}
        </Typography>
        {components.content}
      </Container>
    )
  }
}
