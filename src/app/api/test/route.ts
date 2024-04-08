import { NextRequest, NextResponse } from 'next/server'
import { ISlug } from '@/models'
import { deleteFolderByName, getAllSubdirectories, getInfoArticle } from './file_reader'
import path from 'path'
import clientPromise from '@/lib/mongodb'
import { Timestamp } from 'mongodb'

export const GET = async (req: NextRequest) => {
  // const dirPath = 'F:\\docker-services\\volumes\\news-results-v2\\news'
  // const news = getAllSubdirectories(dirPath)
  // const data = news.map((item) => {
  //   const articlePath = path.join(dirPath, item)
  //   return getInfoArticle(articlePath)
  // })
  // return new Response(JSON.stringify(data))

  // const newsContent = getInfoArticle('F:\\docker-services\\volumes\\news-results\\news\\_4711046')
  // return new Response(JSON.stringify(newsContent))

  const connector = await clientPromise
  const collection = connector.db('newspaper_project').collection('test')
  const data = await collection.find({}).toArray()
  return new Response(JSON.stringify({ connected: true, data }))

  // try {
  //   const connector = await clientPromise
  //   const db = connector.db('sample_mflix')
  //   const movies = await db.collection('movies').find({}).sort({ metacritic: -1 }).limit(10).toArray()
  //   return new Response(JSON.stringify(movies), { status: 200 })
  // } catch (e) {
  //   console.error(e)
  //   return new Response('[]')
  // }
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const type = body.type
    if (!type) {
      return new Response(JSON.stringify({ error: 'No type' }), { status: 400 })
    }
    const connector = await clientPromise
    const collection = connector.db('newspaper_project').collection('article_type')
    await collection.insertOne({ type })
    return new Response(JSON.stringify({ type, status: true }), { status: 201, statusText: 'Data saved successfully!' })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Something went wrong!' }), { status: 500 })
  }
}

// export async function DELETE(request: NextRequest) {
//   // console.log('request', request)
//   // const body = await request.json()
//   // const userId = body.userId
//   // if (!userId) {
//   //   return NextResponse.json({ error: 'No user id' }, { status: 400 })
//   // }
//   const dirPath = 'F:\\docker-services\\volumes\\news-results\\news'
//   deleteFolderByName(dirPath, 'deleted-test')

//   return new Response(JSON.stringify({ status: true }))
// }
