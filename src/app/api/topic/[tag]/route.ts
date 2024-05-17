import { NextRequest } from 'next/server'
import { ECollection, MongoDBConnection } from '@/library/MongoDBConnection'

export interface ITopicParams {
  params: { tag: string }
}

export const GET = async (request: NextRequest, { params }: ITopicParams) => {
  const collection = await MongoDBConnection(ECollection.Article)
  const data = await collection.find({ tag: params.tag }).toArray()
  return new Response(JSON.stringify(data))
}
