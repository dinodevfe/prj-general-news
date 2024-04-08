import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import clientPromise from '@/lib/mongodb'
import { deleteFolderByName, getAllSubdirectories, getInfoArticle } from '../_helper/file_reader'
import { IArticleDTO } from '@/models'

export const GET = async () => {
  try {
    if (!process.env.DIR_PATH) {
      throw new Error('Invalid/Missing environment variable: "DIR_PATH"')
    }
    const dirPath = process.env.DIR_PATH
    const news = getAllSubdirectories(dirPath)
    const data = news.map((item) => {
      const articlePath = path.join(dirPath, item)
      return getInfoArticle(articlePath)
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

export const POST = async (request: NextRequest) => {
  try {
    const body: IArticleDTO = await request.json()
    if (!body.articleId) return new Response(JSON.stringify({ error: 'No articleId' }), { status: 400 })

    const connector = await clientPromise
    const collection = connector.db('newspaper_project').collection('article')
    await collection.insertOne(body)
    return new Response(JSON.stringify({ status: true }))
  } catch (error) {
    return new Response(JSON.stringify({ status: false }))
  }
}
