import React, { Component } from 'react'
import { Box, Fade, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'
import FiberNewIcon from '@mui/icons-material/FiberNew'

interface IProps {
  data?: any
  onEdit: () => void
  onDetailModal?: () => void
  HideEdit?: boolean
  HideDelete?: boolean
  isNew?: boolean
}

export default class ItemRowMenu extends Component<IProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', width: 150 }}>
        <Tooltip title='Edit'>
          <IconButton onClick={this.props.onEdit}>
            <EditIcon color='info' fontSize='small' />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title='Delete'>
          <IconButton onClick={this.props.onDelete}>
            <DeleteIcon color='error' fontSize='small' />
          </IconButton>
        </Tooltip> */}
        <Fade in={this.props.isNew} unmountOnExit>
          <FiberNewIcon sx={{ color: '#31a731' }} />
        </Fade>
      </Box>
    )
  }
}
