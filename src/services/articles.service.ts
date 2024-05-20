import { IArticle } from '@/models'
import { ApiAlertContext } from '@/components/AlertGlobal'
import ServiceBase from '@/services/service-base'
import Lb4Query from './lb4-query'

class ArticlesServiceBase extends ServiceBase {
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
}
export const ArticlesService = new ArticlesServiceBase()
