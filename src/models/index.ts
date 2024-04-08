export * from './NavigationKeys'

export interface ISlug {
  params: { slug: string }
}

export type TNewsType = 'nomal' | 'hot' | 'carousel'

export type TArticleStatus = 'Pending' | 'Approve'

export interface IArticleDTO {
  articleId: string
  title: string
  author: string
  content: string
  imageUrl: string
  originUrl: string
  sourceTitle: string
  sourceUrl: string
  createdDate: string
  status: TArticleStatus
  tag?: string
  type?: TNewsType
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
