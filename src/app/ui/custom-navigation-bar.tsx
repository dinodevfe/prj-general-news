'use client'
import React, { FC } from 'react'
import { NavigationKeys } from '@/models'
import { Container, Typography } from '@mui/material'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import './custom-navigation-bar.styled.css'

export interface INavItem {
  title: string
  parentKey: string
  key: string
}

const NavConfigs: INavItem[] = [
  { title: 'Mới nhất', parentKey: NavigationKeys.Home, key: 'all' },
  { title: 'Thế giới', parentKey: NavigationKeys.Topic, key: 'the-gioi' },
  { title: 'Kinh doanh', parentKey: NavigationKeys.Topic, key: 'kinh-doanh' },
  { title: 'Khoa học', parentKey: NavigationKeys.Topic, key: 'khoa-hoc' },
  { title: 'Thể thao', parentKey: NavigationKeys.Topic, key: 'the-thao' }
]

interface IProps {}

const CustomNavigationBar: FC<IProps> = () => {
  const pathname = usePathname()

  const checkIsActive = (item: INavItem) => {
    if (item.key == 'all') return item.parentKey === pathname
    const isNavKey = pathname.includes(item.parentKey)
    const isQuery = pathname.includes(item.key)
    return isNavKey && isQuery
  }

  const getHref = (item: INavItem) => {
    return item.key !== 'all' ? `${item.parentKey}/${item.key}` : item.parentKey
  }

  return (
    <Container component='nav' className='custom-nav'>
      <ul>
        {NavConfigs.map((item, index) => {
          const isActive = checkIsActive(item)
          const href = getHref(item)
          return (
            <li key={index}>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 600 }}
                component={Link}
                href={href}
                className={isActive ? 'active' : ''}
              >
                {item.title}
              </Typography>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
export default CustomNavigationBar
