import React, { Component } from 'react'
import { Box, Divider, IconButton, InputBase, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default class SearchInput extends Component {
  render() {
    return (
      <Wrapper>
        <InputBase placeholder='Search News' sx={{ flex: 1 }} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #767676',
  padding: '0 9px 0 24px',
  borderRadius: '24px',
  width: '500px'
})
