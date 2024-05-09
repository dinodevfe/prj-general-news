'use client'
import React, { FC, useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Content from './_component/Content'

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

interface IProps {}

const HomePage: FC<IProps> = async (props: IProps) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const func = async () => {
      setData(await getData())
    }
    func()
  }, [])

  return (
    <Container style={{ padding: '18px 0 56px' }}>
      <Content data={data} />
    </Container>
  )
}
export default HomePage
