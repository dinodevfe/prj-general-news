import { IArticleDTO } from '@/models'

class NewsService {
  detail = async (id: string): Promise<IArticleDTO | undefined> => {
    const res = await fetch(`/api/news/${id}`)
    if (!res.ok) return
    return await res.json()
  }
}

export default new NewsService()
