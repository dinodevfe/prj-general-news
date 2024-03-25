'use client'
import React, { Component, Suspense } from 'react'
import { Container, Grid, styled } from '@mui/material'
import CardBasic from './_component/CardBasic'
import CardTrends from './_component/CardTrends'
import CardWelcome from './_component/CardWelcome'
import CardCarousel from './_component/CardCarousel'
import CardMultiple from './_component/CardMultiple'
import { INewsDTO } from '@/models'

// type TCardType = 'basic' | ''

interface IConfig {
  size: 3 | 6 | 12
  component: React.ReactNode
}

const Config: IConfig[] = [
  { size: 6, component: <CardWelcome /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardMultiple /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardTrends /> },
  { size: 3, component: <CardBasic /> },
  { size: 6, component: <CardCarousel /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardBasic /> },
  { size: 3, component: <CardBasic /> }
]

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
        <Grid container spacing={2}>
          {Config.map((item, index) => (
            <Grid item xs={item.size} key={index}>
              {item.component}
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    )
  }
}

const Wrapper = styled(Container)({
  padding: '18px 0 56px'
})
