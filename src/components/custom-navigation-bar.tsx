import React, { FC } from 'react'
import { NavigationKeys } from '@/models'
import { Container, Typography } from '@mui/material'
import Link from 'next/link'

import './custom-navigation-bar.styled.css'

export interface INavItem {
  title: string
  key: string
}

const getUri = (topicName: string) => {
  return `${NavigationKeys.Topic}/${topicName}`
}

const NavConfigs: INavItem[] = [
  { title: 'Mới nhất', key: 'all' },
  { title: 'Thế giới', key: 'the-gioi' },
  { title: 'Kinh doanh', key: 'kinh-doanh' },
  { title: 'Khoa học', key: 'khoa-hoc' },
  { title: 'Thể thao', key: 'the-thao' }
]

interface IProps {}

const CustomNavigationBar: FC<IProps> = () => {
  return (
    <Container component='nav' className='custom-nav'>
      <ul>
        {NavConfigs.map((item, index) => (
          <li key={index}>
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }} component={Link} href={getUri(item.key)}>
              {item.title}
            </Typography>
          </li>
        ))}
      </ul>
    </Container>
  )
}
export default CustomNavigationBar
