'use client'
import React, { Component } from 'react'
import Image from 'next/image'
import PicDefault from '@/images/image-default.jpg'
import { faker } from '@faker-js/faker'
import { Box } from '@mui/material'

interface IProps {}

interface IState {
  loading: boolean
  src: string
}

const ImageUrl = faker.image.url()

export default class ImageLoader extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { src: '', loading: true }
  }

  handleLoad = () => {
    console.log('on load')
    this.setState({ src: ImageUrl, loading: false })
  }

  handleError = () => {
    console.log('on eror')
    this.setState({ loading: false })
  }

  render() {
    return (
      <>
        {this.state.loading && <Image alt='pic' src={PicDefault} />}
        <Image
          src={ImageUrl}
          alt='picture'
          onLoad={this.handleLoad}
          onError={this.handleError}
          unoptimized
          width={500}
          height={500}
          // onLoadingComplete={(img) => this.setState({ loading: false })}
        />
      </>
    )
  }
}
