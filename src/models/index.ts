export * from './NavigationKeys'

export interface ISlug {
  params: { slug: string }
}

export type TNewsType = 'nomal' | 'hot' | 'carousel'

export interface IArticleDTO {
  id: string
  title: string
  author: string
  content: string
  imageUrl: string
  sourceTitle: string
  sourceUrl: string
  createdDate: string
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
