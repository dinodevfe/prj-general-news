export * from './NavigationKeys'

export interface ISlug {
  params: { slug: string }
}

export type TNewsType = 'nomal' | 'hot' | 'carousel'

export interface INewsDTO {
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

export interface IConfig {}
