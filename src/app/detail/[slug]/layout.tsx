'use client'
import React, { Component, PropsWithChildren } from 'react'
import { Box, TextField } from '@mui/material'
import Image from 'next/image'
import Logo from '../../../images/logo.jpg'
import Toolbar from '../_component/Toolbar'

interface IProps {}

export default class HomeLayout extends Component<PropsWithChildren<IProps>> {
  render() {
    return (
      <Box sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
        <Box component='header' sx={{ backgroundColor: '#fff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src={Logo} alt='logo' priority />
            <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
              <TextField placeholder='Search' />
            </Box>
            <Box sx={{ width: '145px' }} />
          </Box>
          <Toolbar indexActive={0} />
        </Box>
        {this.props.children}
      </Box>
    )
  }
}
