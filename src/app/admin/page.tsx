'use client'
import React, { Component } from 'react'
import { EArticleStatus, IArticleDTO } from '@/models'
import { AlertGlobal } from 'partner-library-mfe/components/AlertGlobal'
import { TItemRowMenuRender } from 'partner-library-mfe/components/TableTemplate'
import GlobalModal, { IGlobalModalContext, mapGlobalModalContext } from 'partner-library-mfe/components/GlobalModal'
import { CreateTable } from './_helper'
import { FormDelete } from './_components/FormCommon'
import Layout from './_components/layout'
import FormDetail from './_components/FormDetail'
import ItemRowMenu from './_components/ItemRowMenu'
import ArticlesService from './_services/ArticlesService'

const Table = CreateTable()

interface IProps {}
interface IState {
  articles: IArticleDTO[]
}

export default class AdminPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { articles: [] }
  }

  render() {
    return (
      <GlobalModal>
        <AlertGlobal />
        <Layout
          title='Article Manager'
          components={{
            content: this.renderContent()
          }}
        />
      </GlobalModal>
    )
  }

  renderContent = () => (
    <Table
      data={this.state.articles}
      ItemRowMenu={this.renderRowMenu}
      InnerProps={{
        initialState: { sorting: { sortModel: [{ field: 'dateRawCrawled', sort: 'desc' }] } },
        checkboxSelection: false,
        disableRowSelectionOnClick: true
      }}
    />
  )

  renderRowMenu = ({ data, children }: TItemRowMenuRender<IArticleDTO>) => {
    return mapGlobalModalContext((context) => <ItemRowMenu onEdit={() => this.handleClickDetail(context, data)} />)
  }

  handleClickDetail = (context: IGlobalModalContext, data: IArticleDTO) => {
    context.showModal({
      content: () => (
        <FormDetail
          data={data}
          onClose={context.closeModal}
          onSubmit={this.handleSubmitApprove}
          onDelete={this.handleSubmitDelete}
        />
      )
    })
  }

  handleClickDelete = (context: IGlobalModalContext, data: IArticleDTO) => {
    context.showModal({
      content: () => <FormDelete data={data} onClose={context.closeModal} onSubmit={this.handleSubmitDelete} />
    })
  }

  handleSubmitDelete = (data: IArticleDTO) => {
    ArticlesService.deleteRaw(data.articleId)
    ArticlesService.delete(data.id)
    const { articles } = this.state
    const nArticles = articles.filter((e) => e.articleId !== data.articleId)
    this.setState({ articles: nArticles })
  }

  handleSubmitApprove = (data: IArticleDTO) => {
    ArticlesService.approve(data)
    const { articles } = this.state
    const nArticles = articles.map((item) => {
      if (item.articleId !== data.articleId) return item
      item.status = EArticleStatus.Approve
      item.dateApproved = new Date().toISOString()
      return item
    })
    this.setState({ articles: nArticles })
  }

  fetchData = async () => {
    const res = await ArticlesService.fetchRawData()
    this.setState({ articles: res })
  }

  componentDidMount() {
    this.fetchData()
  }
}
