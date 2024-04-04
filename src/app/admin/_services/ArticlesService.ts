import { IArticleDTO } from '@/models'

class ArticlesService {
  fetchAll = async (): Promise<IArticleDTO[]> => {
    try {
      const res = await fetch(`/api/news`)
      if (!res.ok) return []
      return await res.json()
    } catch (error) {
      return []
    }
  }

  deleteOne = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
      })
      if (res.ok) return true
      return false
    } catch (error) {
      return false
    }
  }
}

export default new ArticlesService()
