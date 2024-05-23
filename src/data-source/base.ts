import { IArticle } from '@/models'

export default abstract class DataSource {
  public abstract getArticles: () => Promise<IArticle[]>
  public abstract getArticle: (id: string) => Promise<IArticle>
  public abstract updateArticle: (value: IArticle) => Promise<IArticle>
  public abstract deleteArticle: (id: string) => void
  public abstract presignedUrl: (filename: string) => Promise<any>
}