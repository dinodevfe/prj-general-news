import { INewsDTO } from '@/models'

class TopicService {
  detail = async (tag: string): Promise<INewsDTO[] | undefined> => {
    const res = await fetch(`/api/topic/${tag}`)
    if (!res.ok) return
    return await res.json()
  }
}

export default new TopicService()
