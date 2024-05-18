import React, { FC, PropsWithChildren } from 'react'
import { NavigationKeys } from '@/models'
import { SocialConfigGlobal } from '@/configs/SocialConfig'
import { Box, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import { getCurrentFormattedDate } from './helper'

import './styled.css'

interface IProps {}

const CustomLayout: FC<PropsWithChildren<IProps>> = (props) => {
  return (
    <Box className='layout-wrap'>
      <Box component='header' className='header'>
        <Container>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', py: '18px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThunderstormIcon />
              <Typography>31 °C, Ho Chi Minh City</Typography>
            </Box>
            <Stack sx={{ flex: 1, alignItems: 'center' }}>
              <Typography variant='h4' {...{ component: Link, href: NavigationKeys.Home }}>
                Popular Newspaper
              </Typography>
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
          {/* <NavigationBar /> */}
        </Container>
      </Box>
      {props.children}
    </Box>
  )
}
export default CustomLayout
