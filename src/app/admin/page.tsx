'use client'
import React, { Component } from 'react'
import { IArticleDTO } from '@/models'
import { AlertGlobal } from 'partner-library-mfe/components/AlertGlobal'
import { TItemRowMenuRender } from 'partner-library-mfe/components/TableTemplate'
import { GlobalModal, IGlobalModalContext, mapGlobalModalContext } from 'partner-library-mfe/components/GlobalModal'
import { CreateTable } from './helper'
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

  fetchData = async () => {
    const res = await ArticlesService.fetchAll()
    this.setState({ articles: res })
  }

  componentDidMount() {
    this.fetchData()
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
        // initialState: { pagination: paginationDefault, sorting: { sortModel: [{ field: 'dateCreated', sort: 'desc' }] } },
        checkboxSelection: false,
        disableRowSelectionOnClick: true
        // rowsPerPageOptions: rowsPerPageOptionsDefault
      }}
    />
  )

  renderRowMenu = ({ data, children }: TItemRowMenuRender<IArticleDTO>) => {
    return mapGlobalModalContext((context) => (
      <ItemRowMenu onEdit={() => this.handleClickDetail(context, data)} onDelete={() => this.handleClickDelete(context, data)} />
    ))
  }

  handleClickDetail = (context: IGlobalModalContext, data: IArticleDTO) => {
    context.showModal({
      content: () => <FormDetail data={data} onClose={context.closeModal} onSubmit={this.handleSubmitApprove} />
    })
  }

  handleClickDelete = (context: IGlobalModalContext, data: IArticleDTO) => {
    context.showModal({
      content: () => <FormDelete data={data} onClose={context.closeModal} onSubmit={this.handleSubmitDelete} />
    })
  }

  handleSubmitDelete = (data: IArticleDTO) => {
    ArticlesService.deleteOne(data.articleId)
    const { articles } = this.state
    this.setState({ articles: this.removeArticle(articles, data.articleId) })
  }

  handleSubmitApprove = (data: IArticleDTO) => {
    ArticlesService.approveArticle(data)
  }

  removeArticle = (list: IArticleDTO[], articleId: string) => list.filter((e) => e.articleId !== articleId)
}
