'use client'
import React, { Component, PropsWithChildren } from 'react'
import { Box, styled } from '@mui/material'
import Image from 'next/image'
import Logo from '@/images/logo.jpg'
import SearchInput from './SearchInput'
import NavigationBar from './NavigationBar'

interface IProps {}

export default class CustomLayout extends Component<PropsWithChildren<IProps>> {
  render() {
    return (
      <Wrapper>
        <Header>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src={Logo} alt='logo' priority />
            <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
              <SearchInput />
            </Box>
            <Box sx={{ width: '145px' }} />
          </Box>
          <NavigationBar />
        </Header>
        {this.props.children}
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)({
  backgroundColor: '#f7f7f7',
  maxHeight: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: '8px', boxShadow: 'unset' },
  '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '6px' },
  '&::-webkit-scrollbar-thumb': { background: '#c2c2c2', borderRadius: '6px' },
  '&::-webkit-scrollbar-thumb:hover': { background: '#818181' }
})

const Header = styled('header')({
  backgroundColor: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 100
})
