import { TArticleContent } from './Content'
import { EArticleStatus } from './enums/ArticleStatus'
import { EArticlePosition } from './enums/ArticleType'

export interface IArticle {
  id: string
  title?: string
  description?: string
  /** link - article origin */
  uriOrigin: string
  imageUriOrigin?: string
  imageUri?: string
  dateCreatedAt?: string
  author?: string
  articleType?: string
  /** title - newspaper page origin */
  sourceOrigin?: string 
  /** link - newspaper page origin */
  sourceUriOrigin?: string
  patch?: string
  status?: EArticleStatus
  position?: EArticlePosition
  content?: TArticleContent[]
}
