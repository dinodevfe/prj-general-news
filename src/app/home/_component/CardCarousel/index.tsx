'use client'
import React, { Component } from 'react'
import { Box, styled } from '@mui/material'
import Slider, { CustomArrowProps } from 'react-slick'
import Item from './Item'

const MAP = [1, 2, 3, 4, 5, 6]

function SamplePrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props
  return <Box {...{ className, onClick }} style={{ ...style, left: '15px', zIndex: 1 }} />
}

function SampleNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props
  return <Box {...{ className, onClick }} style={{ ...style, right: '25px', zIndex: 1 }} />
}

export default class CardCarousel extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }
    return (
      <Wrapper {...settings}>
        {MAP.map((item, index) => (
          <Item key={index} />
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled(Slider)({
  '& .slick-list': {
    borderRadius: '6px'
  },
  '& .slick-dots': {
    display: 'inline-flex!important',
    width: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '6px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '0 9px',
    borderRadius: '10px'
  },
  '& .slick-dots > li': {
    margin: 0
  },
  '& .slick-dots > li > button::before': {
    color: '#fff!important'
  }
})
