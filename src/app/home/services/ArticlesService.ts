import { IArticle } from '@/models'
import { ApiAlertContext } from '@/components/AlertGlobal'
import ServiceBase from '@/services/ServiceBase'
import Lb4Query from './Lb4Query'

class ArticlesServiceBase extends ServiceBase {
  constructor() {
    super()
  }

  all = async (): Promise<IArticle[]> => {
    try {
      const res = await this.GET(`articles?filter=${Lb4Query.all()}`)
      if (!res.ok) return []
      return await res.json()
    } catch (error: any) {
      console.log(error.message)
      ApiAlertContext.ApiAlert?.PushWarning('Get data failed! Server something wrong...')
      return []
    }
  }
}
const ArticlesService = new ArticlesServiceBase()
export default ArticlesService
