import { NextRequest, NextResponse } from 'next/server'
import { DataSourceInstance } from '@/data-source'

interface IGetParams {
  params: { id: string }
}

export const GET = async (request: NextRequest, { params }: IGetParams) => {
  const { id } = params
  if (!id) throw Error('No article found!')
  const article = await DataSourceInstance.getArticle(id)
  return new NextResponse(JSON.stringify(article))
}
