import React, { FC } from 'react'
import { Box, Skeleton, styled } from '@mui/material'

const SkeletonCardCarousel: FC = () => (
  <Wrapper>
    <Content>
      <Skeleton variant='rounded' width='100%' height='100%' />
    </Content>
  </Wrapper>
)

export default SkeletonCardCarousel

const Wrapper = styled(Box)({
  position: 'relative',
  width: 'calc(100% - 6px)',
  paddingBottom: 'calc(50% - 8px)'
})

const Content = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})
