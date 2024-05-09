// 'use client'
'use server'
import React, { Component, FC, cache } from 'react'
import { IArticleDTO } from '@/models'
import { Container, styled } from '@mui/material'
import Content from './_component/Content'

interface IProps {
  data: IArticleDTO[]
}

interface IState {}

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/news')
  if (!res.ok) return []
  const data = await res.json()
  return data
}

const HomePage: FC<IProps> = async (props: IProps) => {
  console.log(props)

  const data = await getData()

  return (
    <Container style={{ padding: '18px 0 56px' }}>
      <Content data={data} />
    </Container>
  )
}
export default HomePage
