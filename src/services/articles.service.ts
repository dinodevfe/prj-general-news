import { IArticle } from '@/models'
import ServiceBase from '@/services/service-base'

class ArticleServiceBase extends ServiceBase {
  constructor() {
    super()
  }

  all = async (): Promise<IArticle[]> => {
    try {
      const res = await this.GET(`articles`)
      console.log(res);
      
      if (!res.ok) return []
      const result = await res.json()
      return result
    } catch (error: any) {
      console.log(error.message)
      return []
    }
  }

  filterByTag = async (tag?: string): Promise<IArticle[]> => {
    try {
      const res = await this.GET(`articles`)
      if (!res.ok) return []
      return await res.json()
    } catch (error: any) {
      console.log(error.message)
      return []
    }
  }

  recommends = async (): Promise<IArticle[]> => {
    try {
      return []
    } catch (error: any) {
      console.log(error.message)
      return []
    }
  }

  detail = async (id: string): Promise<IArticle | undefined> => {
    const res = await this.GET(`articles/${id}`)
    if (!res.ok) return
    return await res.json()
  }
}
export const ArticleService = new ArticleServiceBase()
