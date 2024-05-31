'use client'
import React, { FC } from 'react'
import { IArticle } from '@/models'
import { Container } from '@mui/material'
import { ArticleService } from '../services'
import ArticlesContent from './ui/articles-content'
import CustomLayout from '@/app/ui/custom-layout'

interface IProps {}

const HomePage: FC<IProps> = (props: IProps) => {
  // const data: IArticle[] = await ArticleService.all()

  const [data, setData] = React.useState<IArticle[]>([])
  React.useEffect(() => {
    const func = async () => {
      const res = await ArticleService.all()
      setData(res)
    }
    func()
  }, [])

  return (
    <CustomLayout>
      <Container style={{ padding: '18px 0 56px' }}>
        <ArticlesContent data={data} />
      </Container>
    </CustomLayout>
  )
}
export default HomePage
