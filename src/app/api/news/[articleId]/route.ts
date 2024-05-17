import { ECollection, MongoDBConnection } from '@/library/MongoDBConnection'

interface INewDetail {
  articleId?: string
}

export async function GET(request: Request, { params }: { params: INewDetail }) {
  const collection = await MongoDBConnection(ECollection.Article)
  const data = await collection.find({ articleId: params.articleId }).toArray()
  return new Response(JSON.stringify(data[0]))
}
