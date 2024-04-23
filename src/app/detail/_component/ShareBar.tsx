import React, { Component } from 'react'
import { Box, Button, ButtonProps, Divider, IconButton, Typography, buttonClasses, colors, styled } from '@mui/material'
import { SocialConfigDetail } from '@/configs/SocialConfig'
import ShareIcon from '@mui/icons-material/Share'

export default class ShareBar extends Component {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomButton>
          <ShareIcon fontSize='small' />
          <Divider flexItem orientation='vertical' />
          <Typography>Chia sẽ</Typography>
        </CustomButton>
        {SocialConfigDetail.map((item, index) => (
          <IconButton key={index}>
            <item.icon sx={{ color: item.color }} />
          </IconButton>
        ))}
      </Box>
    )
  }
}

const CustomButton = styled(({ className, children, ...props }: ButtonProps) => (
  <Button component='div' variant='outlined' color='inherit' size='small' {...props} className={className}>
    {children}
  </Button>
))({
  [`&.${buttonClasses.root}`]: {
    textTransform: 'unset !important',
    border: '1px solid #eaeaea',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginRight: '6px',
    color: '#767676'
  }
})
