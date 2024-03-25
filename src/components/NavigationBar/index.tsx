'use client'
import React, { FC } from 'react'
import { usePathname } from 'next/navigation'
import { Button, Container, styled } from '@mui/material'
import Link from 'next/link'
import { INavigation, NavigationConfig, isCurrentNavigation } from './config'

const NavigationBar: FC = () => {
  const pathname = usePathname()

  const getHref = (item: INavigation) => {
    if (!item.slug) return item.pathname
    return `${item.pathname}/${encodeURIComponent(item.slug)}`
  }

  return (
    <Container>
      <Ul>
        {NavigationConfig.map((item, index) => {
          const isActived = isCurrentNavigation(pathname, item)
          return (
            <Li key={index} {...(isActived ? { className: 'active' } : {})}>
              <Item color='inherit' {...{ component: Link }} href={getHref(item)}>
                {item.title}
              </Item>
            </Li>
          )
        })}
      </Ul>
    </Container>
  )
}

export default NavigationBar

const Ul = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '3px 0'
})

const Li = styled('li')({
  '&.active > .MuiButton-root': {
    backgroundColor: '#767676',
    color: '#fff'
  }
})

const Item = styled(Button)({
  textTransform: 'none',
  padding: '6px 18px',
  borderRadius: '18px'
})
