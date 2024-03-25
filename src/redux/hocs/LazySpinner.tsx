import React, { Component, PropsWithChildren } from 'react'
import { Box, Fade, LinearProgress, styled } from '@mui/material'

type TProps = PropsWithChildren<{
  in?: boolean
}>
export default class LazySpinner extends Component<TProps> {
  render() {
    return (
      <>
        {this.props.children}
        <Fade in={this.props.in} timeout={{ enter: 0, exit: 350 }}>
          <ContainerSpinner>
            <LinearProgress />
          </ContainerSpinner>
        </Fade>
      </>
    )
  }
}

const ContainerSpinner = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.11)',
  zIndex: 150
})
