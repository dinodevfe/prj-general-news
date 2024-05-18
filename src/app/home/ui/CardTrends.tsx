'use client'
import React, { Component } from 'react'
import { Box, Stack, Typography, styled } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export default class CardTrends extends Component {
  render() {
    return (
      <Box sx={{ width: '100%', pb: '100%', position: 'relative' }}>
        <Wrapper>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Tin tức hàng đầu
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {[0, 1, 2].map((item, index) => (
              <Item key={index}>
                <Stack flex={1}>
                  <Typography variant='subtitle1'>Title {item}</Typography>
                  <Typography variant='body2'>Sub title</Typography>
                </Stack>
                <Stack>
                  <Typography variant='subtitle1'>+0.1%</Typography>
                  <Typography variant='body2'>99,99.99</Typography>
                </Stack>
              </Item>
            ))}
          </Box>
        </Wrapper>
      </Box>
    )
  }
}

const Wrapper = styled(Stack)({
  borderRadius: '6px',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  padding: '9px'
})

const Item = styled(Box)({
  display: 'flex',
  marginTop: '4px',
  backgroundColor: '#f7f7f7',
  padding: '6px'
})
