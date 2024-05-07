import React, { Component, ReactNode } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import './index.css'

interface IItemRowMenuProps {
  onEdit?: () => void
  onDelete?: () => void
}

export type TItemRowMenuRender<T> = { data: T; children: ReactNode }

export class ItemRowMenu extends Component<React.PropsWithChildren<IItemRowMenuProps>> {
  render() {
    return (
      <div className='wrap-title-video'>
        <span className='title'>{this.props.children}</span>
        <div className='container-action'>
          {this.props.onEdit && (
            <Tooltip title='Edit'>
              <IconButton onClick={this.props.onEdit}>
                <Edit color='info' fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
          {this.props.onDelete && (
            <Tooltip title='Delete'>
              <IconButton onClick={this.props.onDelete}>
                <Delete color='error' fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    )
  }
}
export default ItemRowMenu
