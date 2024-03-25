export * from './NavigationKeys'

export interface ISlugProps {
  params: { slug: string }
}

export interface INewsDTO {
  id: string
  title: string
  author: string
  content: string
  sourceTitle: string
  sourceUrl: string
  createdDate: string
}

export interface IConfig {}
