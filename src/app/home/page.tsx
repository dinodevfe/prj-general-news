'use client'
import React, { Component } from 'react'
import { INewsDTO } from '@/models'
import { Container, styled } from '@mui/material'
import Content from './_component/Content'

interface IProps {}
interface IState {
  data: INewsDTO[]
}

export default class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { data: [] }
  }

  fetchData = async () => {
    const res = await fetch('/api/news')
    if (!res.ok) return
    const data = await res.json()
    this.setState({ data })
  }

  componentDidMount(): void {
    this.fetchData()
  }

  render() {
    return (
      <Wrapper>
        <Content data={this.state.data} />
      </Wrapper>
    )
  }
}

const Wrapper = styled(Container)({
  padding: '18px 0 56px'
})
