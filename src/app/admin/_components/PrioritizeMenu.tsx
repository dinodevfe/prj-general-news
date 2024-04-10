import React, { Component } from 'react'
import { FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material'
import { EArticleType } from '@/models'

const ArticleType: { [key in EArticleType]: string } = {
  Nomal: 'Basic',
  Hot: 'Hot list',
  Carousel: 'Carousel list'
}

export default class PrioritizeMenu extends Component {
  render() {
    return (
      <FormControl>
        <InputLabel id='prioritize-select'>Type</InputLabel>
        <CustomSelect id='prioritize-select' label='Type' size='small' value={EArticleType.Nomal}>
          <MenuItem value={EArticleType.Nomal}>{ArticleType[EArticleType.Nomal]}</MenuItem>
          <MenuItem value={EArticleType.Hot}>{ArticleType[EArticleType.Hot]}</MenuItem>
          <MenuItem value={EArticleType.Carousel}>{ArticleType[EArticleType.Carousel]}</MenuItem>
        </CustomSelect>
      </FormControl>
    )
  }
}

const CustomSelect = styled(Select)({
  width: '175px'
})
