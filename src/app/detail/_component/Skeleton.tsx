import React, { Component } from 'react'
import { Box, Skeleton } from '@mui/material'

export class ContentSkeleton extends Component {
  render() {
    return (
      <Box>
        <Skeleton variant='rectangular' width='100%' height={60} />
        <Skeleton variant='rectangular' width='100%' height={60} />
        <Skeleton variant='rectangular' width='100%' height={60} />
        <Skeleton variant='rectangular' width='100%' height={60} />
      </Box>
    )
  }
}
