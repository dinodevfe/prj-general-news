import { IArticleDTO } from '@/models'

class TopicServiceBase {
  detail = async (tag: string): Promise<IArticleDTO[] | undefined> => {
    const res = await fetch(`/api/topic/${tag}`)
    if (!res.ok) return
    return await res.json()
  }
}
const TopicService = new TopicServiceBase()
export default TopicService
