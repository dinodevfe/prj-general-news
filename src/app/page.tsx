'use client'
import React, { FC, useEffect, useState } from 'react'
import { IArticle } from '@/models'
import { Box, Container, Fade } from '@mui/material'
import { ArticleService } from '../services'
import ArticlesContent from './ui/articles-content'
import CustomLayout from '@/app/ui/custom-layout'

const getData = async () => {
  try {
    const res = await ArticleService.all()
    return res
  } catch (error) {
    console.log(error)
    return []
  }
}

interface IProps {}

const HomePage: FC<IProps> = (props: IProps) => {
  // const data = await getData()

  const [data, setData] = useState<IArticle[]>([])
  useEffect(() => {
    const func = async () => {
      setData(await getData())
    }
    func()
  }, [])

  return (
    <CustomLayout>
      <Container style={{ padding: '18px 0 56px' }}>
        <Fade in={data.length > 0} unmountOnExit>
          <Box>
            <ArticlesContent data={data} />
          </Box>
        </Fade>
      </Container>
    </CustomLayout>
  )
}
export default HomePage
