import React, { Component } from 'react'
import { Box, Skeleton, Stack } from '@mui/material'
import { getRandomNumberFromArray } from '@/helpers'

const ParagraphHeight: number[] = [24, 48, 180, 140, 400, 78]

export class ContentSkeleton extends Component {
  render() {
    return (
      <Stack sx={{ gap: '18px' }}>
        {[0, 1, 2, 3, 4, 5].map((item) => {
          const height = getRandomNumberFromArray(ParagraphHeight, ParagraphHeight[0])
          return <Skeleton key={item} variant='rectangular' width='100%' height={height} />
        })}
      </Stack>
    )
  }
}
