import { IArticle } from '@/models'
import ServiceBase from '@/services/service-base'
import Lb4Query from './lb4-query'

class TopicServiceBase extends ServiceBase {
  constructor() {
    super()
  }

  detail = async (tag: string): Promise<IArticle[] | undefined> => {
    const res = await this.GET(`articles?filter=${Lb4Query.topics(tag)}`)
    if (!res.ok) return
    return await res.json()
  }
}
const TopicService = new TopicServiceBase()
export default TopicService
