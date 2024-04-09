export * from './NavigationKeys'

export interface ISlug {
  params: { slug: string }
}

export type TNewsType = 'nomal' | 'hot' | 'carousel'

export enum EArticleStatus {
  Pending = 'Pending',
  Approve = 'Approve',
  Error = 'Error',
  Reject = 'Reject'
}

export interface IArticleDTO {
  id: string
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
  tag?: string
  type?: TNewsType
}

export interface IArticleMongoDB extends IArticleDTO {
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
