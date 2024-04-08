import { IArticleDTO } from '@/models'

class ArticlesService {
  add = async (args: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: args })
      })
      if (res.ok) return true
      return false
    } catch (error) {
      return false
    }
  }
}

export default new ArticlesService()
