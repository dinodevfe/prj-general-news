import { NextRequest, NextResponse } from 'next/server'
import { deleteFolderByName, getAllSubdirectories, getInfoArticle } from '../_helper/file_reader'
import path from 'path'

export const GET = async () => {
  const dirPath = 'F:\\docker-services\\volumes\\news-results-v2\\news'
  const news = getAllSubdirectories(dirPath)
  const data = news.map((item) => {
    const articlePath = path.join(dirPath, item)
    return getInfoArticle(articlePath)
  })
  return new Response(JSON.stringify(data))
}

export async function DELETE(request: NextRequest) {
  const body = (await request.json()) as { id: string }
  if (!body.id) {
    return NextResponse.json({ error: 'No user id' }, { status: 400 })
  }
  // const dirPath = 'F:\\docker-services\\volumes\\news-results-v2\\news'
  // deleteFolderByName(dirPath, body.id)
  return new Response(JSON.stringify({ id: body.id, status: true }))
}
