'use client'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='standard' {...props} style={{ minWidth: '300px' }} />
})

interface MessageData {
  id: string
  text: string
  type: AlertColor
  duration?: number
}

interface IApiAlert {
  PushMessage: (data: MessageData) => void
  PushInfo: (data: string) => void
  PushError: (data: string) => void
  PushWarning: (data: string) => void
  PushSuccess: (data: string) => void
}

interface IApiContext {
  ApiAlert?: IApiAlert
}

export const ApiAlertContext: IApiContext = {}

const RenderArea = (messages: MessageData[], onClose: (data: MessageData) => void) => {
  return messages.map((x, i) => {
    return <Message key={x.id} data={x} IsOpen={true} handleClose={onClose} autoDurationHide={x.duration} />
  })
}

export function AlertGlobal() {
  const [Messages, setMessages] = useState<MessageData[]>([])
  const _PushMessage = useCallback((data: MessageData) => {
    setMessages((st) => [...st, data])
  }, [])
  const _HandleClose = useCallback(
    (data: MessageData) => {
      const index = Messages.findIndex((x) => x.id === data.id)
      const temps = Messages.splice(index, 1)
      setMessages([...Messages])
    },
    [Messages]
  )

  useEffect(() => {
    ApiAlertContext.ApiAlert = {
      ...(ApiAlertContext.ApiAlert ? ApiAlertContext.ApiAlert : {}),
      PushMessage: _PushMessage,
      PushError: function (data: string) {
        this.PushMessage({
          id: new Date().getTime().toString(),
          text: data,
          type: 'error'
        })
      },
      PushInfo: function (data: string) {
        this.PushMessage({
          id: new Date().getTime().toString(),
          text: data,
          type: 'info',
          duration: 6000
        })
      },
      PushWarning: function (data: string) {
        this.PushMessage({
          id: new Date().getTime().toString(),
          text: data,
          type: 'warning',
          duration: 6000
        })
      },
      PushSuccess: function (data: string) {
        this.PushMessage({
          id: new Date().getTime().toString(),
          text: data,
          type: 'success',
          duration: 3000
        })
      }
    }
  }, [_PushMessage])

  return (
    <div
      style={{
        zIndex: 1400,
        position: 'fixed',
        display: 'flex',
        right: '10px',
        WebkitBoxPack: 'start',
        WebkitJustifyContent: 'flex-start',
        justifyContent: 'flex-start',
        WebkitAlignItems: 'center',
        WebkitBoxAlign: 'center',
        alignItems: 'center'
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: '300px' }}>
        {RenderArea(Messages, _HandleClose)}
      </Stack>
    </div>
  )
}

interface MessageProps {
  IsOpen: boolean
  handleClose: (data: MessageData) => void
  data: MessageData
  autoDurationHide?: number
}
const Message: FC<MessageProps> = (props) => {
  const _handleClose = useCallback(() => props.handleClose(props.data), [props])

  useEffect(() => {
    let Timer: NodeJS.Timeout | null = null
    if (props.autoDurationHide) {
      Timer = setTimeout(() => {
        props.handleClose(props.data)
      }, props.autoDurationHide)
    }
    return () => {
      clearTimeout(Timer as any)
    }
  }, [props])
  return (
    <Alert onClose={_handleClose} severity={props.data.type}>
      {props.data.text}
    </Alert>
  )
}

interface AlertDialogProps {
  IsOpen: boolean
  onClose?: () => void
  onAccept?: () => void
  Title: string
  Message: string
}
export const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const [Open, setOpen] = React.useState(props.IsOpen)
  React.useEffect(() => {
    setOpen(props.IsOpen)
  }, [props.IsOpen])
  const _handleClose = React.useCallback(() => {
    setOpen(false)
    props.onClose && props.onClose()
  }, [props])
  return (
    <div>
      <Dialog open={Open} onClose={_handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{props.Title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{props.Message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAccept} autoFocus color='info'>
            Ok
          </Button>
          <Button onClick={_handleClose} color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
