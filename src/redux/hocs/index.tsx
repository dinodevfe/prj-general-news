/* eslint-disable @typescript-eslint/no-explicit-any, import/no-named-as-default-member */
import React, { Component, ComponentType } from 'react'
import { connect, ConnectedComponent } from 'react-redux'
import { AppDispatch, LazyStatus } from '../type'
import { ActionMapDispatchToProps, ActionMapStateToProps, IReturnDispatch, TDispatchRedux, TStateRedux } from '../type'
import LazySpinner from './LazySpinner'

interface hocComponentProp<TActionParam> {
  params?: TActionParam
}

interface OptionsHocLazy<TActionParam> {
  params?: TActionParam
}
export const customConnect = function <
  TActionParam,
  TMapState extends TStateRedux,
  TMapDispatch extends TDispatchRedux<TActionParam> = TDispatchRedux<TActionParam>,
  TComponentProps = any
>(
  WrappedComponent: ComponentType<TComponentProps>,
  actionState: ActionMapStateToProps<TMapState> | null = null,
  actionProp: ActionMapDispatchToProps<TMapDispatch> | null = null,
  options: OptionsHocLazy<TActionParam> | null = null
) {
  type TProps = hocComponentProp<TActionParam> & TMapState & TMapDispatch & TComponentProps
  class HocComponent extends Component<TProps> {
    constructor(props: any) {
      super(props)
      this.state = {
        Status: LazyStatus.Loading
      }
    }

    componentDidMount = () => {
      const param = Object.assign({}, this.props.params ?? {}, options?.params ?? {})
      // this.DispatchReturn = this.props.fetchData ? this.props.fetchData(param) : undefined
    }

    DispatchReturn?: IReturnDispatch
    componentWillUnmount() {
      this.DispatchReturn?.abort()
    }

    render = () => {
      return this.renderContent()
    }

    renderContent = () => {
      switch (this.props.status) {
        case LazyStatus.Loading:
        case LazyStatus.Loaded:
          return (
            <LazySpinner in={this.props.status === LazyStatus.Loading}>
              <WrappedComponent {...this.props} />
            </LazySpinner>
          )
        case LazyStatus.Error:
          return <div>Error...</div>
        default:
          return <div></div>
      }
    }
  }

  const customActionProps = (dispatch: AppDispatch) => {
    return { ...(actionProp ? actionProp(dispatch) : {}) }
  }

  return connect(actionState, customActionProps)(HocComponent as any) as ConnectedComponent<
    ComponentType<TComponentProps>,
    TComponentProps
  >
}
