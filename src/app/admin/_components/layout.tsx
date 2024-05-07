import React, { Component } from 'react'
import { Box, BoxProps, Container, Typography, boxClasses, styled } from '@mui/material'

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
      <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: '9px', overflow: 'hidden' }}>
        <Typography variant='h5' sx={{ m: '24px 0 9px' }}>
          {title}
        </Typography>
        <AbsoluteBox>{components.content}</AbsoluteBox>
      </Container>
    )
  }
}

const AbsoluteBox = styled(({ className, children, ...props }: BoxProps) => (
  <Box {...props} className={className}>
    <Box>{children}</Box>
  </Box>
))({
  flex: 1,
  position: 'relative',
  [`& > .${boxClasses.root}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden'
  }
})
