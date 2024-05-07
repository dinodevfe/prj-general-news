import React, { Component } from 'react'
import { Modal, SxProps, ModalProps, Box, Fade, Backdrop, styled } from '@mui/material'

interface IBase {
  sx?: SxProps
  sxWrapper?: SxProps
  modalProps?: ModalProps
  isBlockBackdropClick?: boolean
  onClose?: () => void
}

export interface IOptionModal extends IBase {
  content?: () => JSX.Element
}

export type TShowModal = (option: IOptionModal) => void
type TCloseModal = (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void

interface IState extends IBase {
  isOpen: boolean
  content?: React.JSXElementConstructor<any>
}

interface IProps {}

export interface IGlobalModalContext {
  showModal: TShowModal
  closeModal: TCloseModal
}

export const GlobalModalContext = React.createContext<IGlobalModalContext>({} as any)

export const mapGlobalModalContext = (context: (state: IGlobalModalContext) => React.ReactNode) => (
  <GlobalModalContext.Consumer>{context}</GlobalModalContext.Consumer>
)

type TProps = React.PropsWithChildren<IProps>
export class GlobalModal extends Component<TProps, IState> implements IGlobalModalContext {
  constructor(props: any) {
    super(props)
    this.state = { isOpen: false }
  }

  showModal = (option: IOptionModal) => {
    this.setState({
      content: option.content,
      sx: option.sx,
      sxWrapper: option.sxWrapper,
      modalProps: option.modalProps,
      isOpen: true,
      onClose: option.onClose,
      isBlockBackdropClick: option.isBlockBackdropClick
    })
  }

  closeModal: TCloseModal = (_, reason) => {
    if (reason === 'backdropClick' && this.state.isBlockBackdropClick) return
    this.state.onClose && this.state.onClose()
    this.setState({ isOpen: false, content: undefined, onClose: undefined })
  }

  generateContent = (): JSX.Element => {
    const Content = this.state.content ?? (() => <></>)
    const Temp = React.forwardRef(() => <Content />)
    return <Temp />
  }

  render() {
    return (
      <GlobalModalContext.Provider value={this}>
        {this.props.children}
        <Modal
          open={this.state.isOpen}
          onClose={this.closeModal}
          sx={this.state.sx}
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 300 } }}
          {...this.state.modalProps}
        >
          <Fade in={this.state.isOpen}>
            <Wrapper sx={this.state.sxWrapper}>{this.generateContent()}</Wrapper>
          </Fade>
        </Modal>
      </GlobalModalContext.Provider>
    )
  }
}
export default GlobalModal

const Wrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none'
})
