import { TArticleContent } from './Content'
import { EArticleStatus } from './enums/ArticleStatus'
import { EArticleType } from './enums/ArticleType'

export interface IArticle {
  id: string
  articleId: string
  title: string
  description?: string
  author: string
  patch: string
  content?: TArticleContent[]
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
