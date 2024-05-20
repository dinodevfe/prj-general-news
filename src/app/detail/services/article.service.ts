import { IArticle } from '@/models'
import ServiceBase from '@/services/service-base'

class ArticleServiceBase extends ServiceBase {
  constructor() {
    super()
  }

  detail = async (id: string): Promise<IArticle | undefined> => {
    const res = await this.GET(`articles/detail/${id}`)
    if (!res.ok) return
    return await res.json()
  }
}
const ArticleService = new ArticleServiceBase()
export default ArticleService
