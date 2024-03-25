import { INewsDTO } from '@/models'

class NewsService {
  detail = async (id: string): Promise<INewsDTO | undefined> => {
    const res = await fetch(`/api/news/${id}`)
    if (!res.ok) return
    return await res.json()
  }
}

export default new NewsService()
