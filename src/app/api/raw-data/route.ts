import path from 'path'
import { deleteFolderByName, getAllSubdirectories, getInfoArticle } from '../_helper/file_reader'
import { NextRequest, NextResponse } from 'next/server'
import { EArticleStatus, IArticleDTO, IArticleMongoDB } from '@/models'
import { MongoDBConnection, ECollection } from '@/lib/MongoDBConnection'

export const GET = async () => {
  try {
    if (!process.env.DIR_PATH) {
      throw new Error('Invalid/Missing environment variable: "DIR_PATH"')
    }
    const dirPath = process.env.DIR_PATH
    const news = getAllSubdirectories(dirPath)

    const collection = await MongoDBConnection(ECollection.Article)
    const articlesApprove = await collection.find<IArticleMongoDB>({}).toArray()

    const data = news.map((item) => {
      const articlePath = path.join(dirPath, item)
      const obj = getInfoArticle(articlePath)
      const aa = articlesApprove.find((e) => e.articleId === obj.articleId)
      if (!aa) return obj
      obj.id = aa._id
      obj.status = EArticleStatus.Approve
      obj.dateApproved = aa.dateApproved
      return obj
    })

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify([]))
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    if (!process.env.DIR_PATH) {
      throw new Error('Invalid/Missing environment variable: "DIR_PATH"')
    }
    const body = (await request.json()) as { id: string }
    if (!body.id) {
      return NextResponse.json({ error: 'No user id' }, { status: 400 })
    }
    deleteFolderByName(process.env.DIR_PATH, body.id)
    return new Response(JSON.stringify({ id: body.id, status: true }))
  } catch (error) {
    return new Response(JSON.stringify({ status: false }))
  }
}
