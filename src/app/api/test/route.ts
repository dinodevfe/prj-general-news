import { NextRequest } from 'next/server'
import { ISlug } from '@/models'
import { deleteFolderByName, getAllSubdirectories, getInfoArticle } from './file_reader'
import path from 'path'

export const GET = async () => {
  const dirPath = 'F:\\docker-services\\volumes\\news-results\\news'
  const news = getAllSubdirectories(dirPath)
  const data = news.map((item, index) => {
    const articlePath = path.join(dirPath, item)
    return getInfoArticle(articlePath)
  })
  return new Response(JSON.stringify({ news, data }))

  // const newsContent = getInfoArticle('F:\\docker-services\\volumes\\news-results\\news\\_4711046')
  // return new Response(JSON.stringify(newsContent))
}

export async function DELETE(request: NextRequest) {
  // console.log('request', request)
  // const body = await request.json()
  // const userId = body.userId
  // if (!userId) {
  //   return NextResponse.json({ error: 'No user id' }, { status: 400 })
  // }
  const dirPath = 'F:\\docker-services\\volumes\\news-results\\news'
  deleteFolderByName(dirPath, 'deleted-test')

  return new Response(JSON.stringify({ status: true }))
}
