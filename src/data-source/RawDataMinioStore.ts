import { EArticlePosition, EArticleStatus, IArticle } from '@/models'
import { MinioBucket, MinioStore } from './minio-store'
import DataSource from './base'
import DbStore from './db-store'

export default class RawDataMinioStore implements DataSource {
  bucket: MinioBucket
  dbStore: DbStore
  constructor() {
    const store = new MinioStore({
      endpoint: 'play.min.io',
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    })
    this.bucket = store.bucket('newspapper-test-loopback4-api')
    this.dbStore = new DbStore(this.bucket)
  }

  public getArticle = async (id: string): Promise<IArticle> => {
    const fileName = this.getFilename(id)
    const dataString = await this.bucket.getString(fileName)
    return JSON.parse(dataString)
  }

  public getArticles = async (): Promise<IArticle[]> => {
    const list = await this.dbStore.getTable('articles')
    const items = list.map((id) => `articles/${id}.json`)
    const articlesRequest = items.map((item) => {
      return this.bucket.getString(item).catch(() => '')
    })
    const articles = await Promise.all(articlesRequest)
    return RawDataMaping.articleRawstoArticles(articles.map((e) => JSON.parse(e)))
  }

  public updateArticle = async (value: IArticle) => {
    const fileName = this.getFilename(value.id)
    const jsonString = JSON.stringify(value)
    await this.bucket.putObject(fileName, jsonString)
    return value
  }

  public deleteArticle = async (id: string) => {
    const fileName = this.getFilename(id)
    await this.bucket.removeObject(fileName)
  }

  public presignedUrl = async (filename: string): Promise<any> => {
    return this.bucket.getPresignedUrl(filename)
  }

  private getFilename = (id: string) => {
    return `articles/${id}.json`
  }
}

class RawDataMaping {
  static articleRawtoArticle = (item: IArticle): IArticle => ({
    ...item,
    status: item.status ?? EArticleStatus.Pending,
    position: item.position ?? EArticlePosition.Normal
  })

  static articleRawstoArticles = (items: IArticle[]): IArticle[] => {
    const list = items.map<IArticle>((item) => RawDataMaping.articleRawtoArticle(item))
    return list.filter((e) => e.status === EArticleStatus.Approve)
  }
}
