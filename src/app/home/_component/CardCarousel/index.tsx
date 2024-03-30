'use client'
import React, { Component, FC } from 'react'
import { INewsDTO } from '@/models'
import { Box, styled } from '@mui/material'
import Slider, { CustomArrowProps, Settings } from 'react-slick'
import Item from './Item'
import SkeletonCardCarousel from './Skeleton'

interface IProps {
  data: INewsDTO[]
}

export default class CardCarousel extends Component<IProps> {
  render() {
    if (this.props.data.length < 1) return <SkeletonCardCarousel />

    return (
      <CustomSlider {...this.getSetting()}>
        {this.props.data.map((item, index) => (
          <Item data={item} key={index} />
        ))}
      </CustomSlider>
    )
  }

  getSetting = (): Settings => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  })
}

const CustomSlider = styled(Slider)({
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
    padding: '0 3px',
    borderRadius: '10px'
  },
  '& .slick-dots > li': {
    margin: 0
  },
  '& .slick-dots > li > button': {
    padding: 0
  },
  '& .slick-dots > li, & .slick-dots > li > button, & .slick-dots > li > button::before': {
    width: '12px',
    height: '12px'
  },
  '& .slick-dots > li > button::before': {
    color: '#fff!important',
    lineHeight: '12px'
  }
})

const SamplePrevArrow: FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props
  return <Box {...{ className, onClick }} style={{ ...style, left: '15px', zIndex: 1 }} />
}

const SampleNextArrow: FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props
  return <Box {...{ className, onClick }} style={{ ...style, right: '25px', zIndex: 1 }} />
}
