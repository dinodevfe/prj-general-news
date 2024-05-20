import { IArticle } from '@/models'
import { ApiAlertContext } from '@/app/ui/alert-global'
import ServiceBase from '@/services/service-base'
import Lb4Query from './lb4-query'

class ArticleServiceBase extends ServiceBase {
  constructor() {
    super()
  }

  all = async (): Promise<IArticle[]> => {
    try {
      const res = await this.GET(`articles?filter=${Lb4Query.articlesQuery()}`)
      if (!res.ok) return []
      return await res.json()
    } catch (error: any) {
      console.log(error.message)
      ApiAlertContext.ApiAlert?.PushWarning('Get data failed! Server something wrong...')
      return []
    }
  }

  recommends = async (): Promise<IArticle[]> => {
    try {
      const res = await this.GET(`articles?filter=${Lb4Query.recommendedArticlesQuery()}`)
      if (!res.ok) return []
      return await res.json()
    } catch (error: any) {
      console.log(error.message)
      ApiAlertContext.ApiAlert?.PushWarning('Get data failed! Server something wrong...')
      return []
    }
  }

  detail = async (id: string): Promise<IArticle | undefined> => {
    const res = await this.GET(`articles/detail/${id}`)
    if (!res.ok) return
    return await res.json()
  }
}
export const ArticleService = new ArticleServiceBase()
