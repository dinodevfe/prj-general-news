'use client'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import store from '@/redux/store'

class Test extends Component {
  render() {
    console.log(this.props)
    return <div>page</div>
  }
}

const mapStateToProps = (state: any) => ({
  stateTest: state
})

const TestConnect = connect(mapStateToProps, () => ({}))(Test)

export default class HomePage extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>HomePage</div>
        <TestConnect />
      </Provider>
    )
  }
}
