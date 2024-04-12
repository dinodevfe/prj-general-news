import { LoadingButton } from '@mui/lab'
import { MenuItem, Box, Menu } from '@mui/material'
import React, { FC, useState, useCallback } from 'react'

export interface IPrioritizeMenuV2Model {
  name: string | JSX.Element
  value: any
}
interface IPrioritizeMenuV2Props {
  data: IPrioritizeMenuV2Model[]
  defaultValue?: number
  onSubmitItem?: (value: any) => Promise<void>
}
export const PrioritizeMenuV2: FC<IPrioritizeMenuV2Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [loading, setLoading] = React.useState(false)
  const [indexSelected, setIndexSelected] = useState(props.defaultValue ?? 0)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const renderItems = () => {
    return props.data.map((x, i) => {
      return (
        <MenuItem key={'key' + i} onClick={() => onItemClick(x.value, i)}>
          {x.name}
        </MenuItem>
      )
    })
  }

  const ItemSelected = props.data[indexSelected]
  const onItemClick = useCallback(
    async (item: any, index: number) => {
      handleClose()
      try {
        if (props.onSubmitItem && index !== indexSelected) {
          setLoading(true)
          await props.onSubmitItem(item)
        }
      } catch {
      } finally {
        setIndexSelected(index)
        setLoading(false)
      }
    },
    [indexSelected]
  )

  return (
    <div>
      <LoadingButton
        loading={loading}
        id='demo-positioned-button'
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
        sx={{ textTransform: 'unset' }}
      >
        <Box sx={{ opacity: loading ? 0.1 : 1 }}>Article type: {ItemSelected?.name ?? 'None'}</Box>
      </LoadingButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {renderItems()}
      </Menu>
    </div>
  )
}
