'use client'
import React, { Component, PropsWithChildren } from 'react'
import CustomLayout from '@/components/Layout'

export default class LayoutChild extends Component<PropsWithChildren<{}>> {
  render() {
    return <CustomLayout>{this.props.children}</CustomLayout>
  }
}
