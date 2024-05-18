'use client'
import React, { FC, useEffect, useState } from 'react'
import { Box, Container, Fade } from '@mui/material'
import Content from './ui/Content'
import ArticlesService from './services/ArticlesService'
import { IArticle } from '@/models'

const getData = async () => {
  try {
    const res = await ArticlesService.all()
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    return []
  }
}

interface IProps {}

const HomePage: FC<IProps> = (props: IProps) => {
  const [data, setData] = useState<IArticle[]>([])
  useEffect(() => {
    const func = async () => {
      setData(await getData())
    }
    func()
  }, [])

  // const data = []

  return (
    <Container style={{ padding: '18px 0 56px' }}>
      <Fade in={data.length > 0} unmountOnExit>
        <Box>
          <Content data={data} />
        </Box>
      </Fade>
    </Container>
  )
}
export default HomePage
