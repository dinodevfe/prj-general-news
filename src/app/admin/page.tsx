'use client'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { Component } from 'react'

export default class AdminPage extends Component {
  deleteItem = async () => {
    const res = await fetch('/api/test', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  }

  render() {
    return (
      <Container>
        <Stack sx={{ gap: '24px' }}>
          <Typography>Admin Page</Typography>
          <Box>
            <Button onClick={this.deleteItem} variant='outlined'>
              Delete One
            </Button>
          </Box>
        </Stack>
      </Container>
    )
  }
}
