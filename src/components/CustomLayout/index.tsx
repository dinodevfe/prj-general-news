'use client'
import React, { Component, PropsWithChildren } from 'react'
import { NavigationKeys } from '@/models'
import { SocialConfigGlobal } from '@/configs/SocialConfig'
import { Box, Container, Divider, IconButton, Stack, Typography, TypographyProps, styled, typographyClasses } from '@mui/material'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import { getCurrentFormattedDate } from './helper'
import NavigationBar from '../NavigationBar'

interface IProps {}

export default class CustomLayout extends Component<PropsWithChildren<IProps>> {
  render() {
    return (
      <Wrapper>
        <Header>
          <Container>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', py: '18px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThunderstormIcon />
                <Typography>31 °C, Ho Chi Minh City</Typography>
              </Box>
              <Stack sx={{ flex: 1, alignItems: 'center' }}>
                <LogoText {...{ component: Link, href: NavigationKeys.Home }}>Popular Newspaper</LogoText>
                <Typography variant='caption'>{getCurrentFormattedDate()}</Typography>
              </Stack>
              <Box>
                {SocialConfigGlobal.map((item, index) => (
                  <IconButton key={index}>
                    <item.icon sx={{ color: item.color }} />
                  </IconButton>
                ))}
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <NavigationBar />
          </Container>
        </Header>
        {this.props.children}
      </Wrapper>
    )
  }
}

const Wrapper = styled(Box)({
  backgroundColor: '#fff',
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
  zIndex: 100,
  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.06)'
})

const LogoText = styled(({ className, children, ...props }: TypographyProps) => (
  <Typography component='h1' variant='h4' className={className} {...props}>
    {children}
  </Typography>
))({
  [`&.${typographyClasses.root}`]: {
    fontWeight: 600,
    transition: 'linear 0.2s'
  },
  [`&.${typographyClasses.root}:hover`]: {
    color: '#309B65'
  }
})
