import React, { Component } from 'react'
import { Skeleton, Stack } from '@mui/material'

const ParagraphHeight: number[] = [24, 48, 180, 140, 400, 78]

export class ContentSkeleton extends Component {
  render() {
    return (
      <Stack sx={{ gap: '18px' }}>
        {ParagraphHeight.map((item) => (
          <Skeleton key={item} variant='rectangular' width='100%' height={item} />
        ))}
      </Stack>
    )
  }
}
