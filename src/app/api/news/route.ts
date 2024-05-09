import { ObjectId } from 'mongodb'
import { EArticleType, IArticleDTO } from '@/models'
import { NextRequest } from 'next/server'
import { MongoDBConnection, ECollection } from '@/lib/MongoDBConnection'

export const GET = async () => {
  try {
    const collection = await MongoDBConnection(ECollection.Article)
    const data = JSON.stringify(await collection.find({}).toArray())
    return new Response(data)
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'No articleId' }), { status: 400 })
  } finally {
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const body: Partial<IArticleDTO> = await request.json()
    if (!body.articleId) return new Response(JSON.stringify({ error: 'No articleId' }), { status: 400 })

    delete body.id
    body.dateApproved = new Date().toISOString()
    const collection = await MongoDBConnection(ECollection.Article)
    await collection.insertOne(body)
    return new Response(JSON.stringify({ status: true }))
  } catch (error) {
    return new Response(JSON.stringify({ status: false }))
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    const body: { id: string } = await request.json()
    if (!body.id) return new Response(JSON.stringify({ error: 'No id' }), { status: 400 })

    const collection = await MongoDBConnection(ECollection.Article)
    await collection.deleteOne({ _id: new ObjectId(body.id) })
    return new Response(JSON.stringify({ status: true }))
  } catch (error) {
    return new Response(JSON.stringify({ status: false }), { status: 500 })
  }
}

export const PATCH = async (request: NextRequest) => {
  try {
    const body: IArticleDTO = await request.json()
    if (!body.id) return new Response(JSON.stringify({ error: 'No article id' }), { status: 400 })

    const collection = await MongoDBConnection(ECollection.Article)
    await collection.updateOne({ _id: new ObjectId(body.id) }, { $set: body })
    return new Response(JSON.stringify({ status: true }))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ status: false }), { status: 500 })
  }
}
