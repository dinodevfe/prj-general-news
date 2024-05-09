'use server'
import React, { FC } from 'react'
import { Container } from '@mui/material'
import Content from './_component/Content'

interface IProps {}

const getData = async () => {
  try {
    const res = await global.fetch('http://localhost:3000/api/news')
    if (!res.ok) return []
    const data = await res.json()
    return data
  } catch (error) {
    return []
  }
}

const HomePage: FC<IProps> = async (props: IProps) => {
  const data = await getData()

  return (
    <Container style={{ padding: '18px 0 56px' }}>
      <Content data={data} />
    </Container>
  )
}
export default HomePage
