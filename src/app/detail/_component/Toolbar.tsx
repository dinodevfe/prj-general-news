'use client'
import { Box, Button, Container, styled } from '@mui/material'
import React, { Component } from 'react'

interface ITab {
  text: string
}

const TABS: ITab[] = [
  { text: 'Mới nhất' },
  { text: 'Tin tức' },
  { text: 'Thể thao' },
  { text: 'Tài chính' },
  { text: 'Góc nhìn' }
]

interface IProps {
  indexActive: number
}

export default class Toolbar extends Component<IProps> {
  render() {
    const { indexActive } = this.props
    return (
      <Container>
        <Ul>
          {TABS.map((item, index) => (
            <Li key={index} {...(indexActive === index ? { className: 'active' } : {})}>
              <Item color='inherit'>{item.text}</Item>
            </Li>
          ))}
        </Ul>
      </Container>
    )
  }
}

const Ul = styled('ul')({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '3px 0'
})

const Li = styled('li')({
  '&.active > button': {
    backgroundColor: '#767676',
    color: '#fff'
  }
})

const Item = styled(Button)({
  textTransform: 'none',
  padding: '6px 18px',
  borderRadius: '18px'
})
