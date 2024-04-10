export * from './NavigationKeys'

export interface ISlug {
  params: { slug: string }
}

export enum EArticleType {
  Nomal = 'Nomal',
  Hot = 'Hot',
  Carousel = 'Carousel'
}

export enum EArticleStatus {
  Pending = 'Pending',
  Approve = 'Approve',
  Error = 'Error',
  Reject = 'Reject'
}

interface IArticleBase {
  articleId: string
  title: string
  description?: string
  author: string
  content: string
  imageUrl: string
  originUrl: string
  sourceTitle: string
  sourceUrl: string
  dateApproved?: string
  dateRawCrawled?: string
  status: EArticleStatus
  index?: number
  tag?: string
  type?: EArticleType
}

export interface IArticleDTO extends IArticleBase {
  id: string
}

export interface IArticleMongoDB extends IArticleBase {
  _id: string
}

interface IContentBase {
  text: string
  type?: 'text' | 'img'
}

interface IContentText extends IContentBase {
  type: 'text'
}

interface IContentImage extends IContentBase {
  type: 'img'
  sub: string
}

export type TContent = IContentText | IContentImage
