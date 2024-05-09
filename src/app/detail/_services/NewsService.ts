import { IArticleDTO } from '@/models'

class NewsServiceBase {
  detail = async (id: string): Promise<IArticleDTO | undefined> => {
    const res = await fetch(`/api/news/${id}`)
    if (!res.ok) return
    return await res.json()
  }
}
const NewsService = new NewsServiceBase()
export default NewsService
