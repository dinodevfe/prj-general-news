import { NextResponse } from 'next/server'
import { DataSourceInstance } from '@/data-source'

export const GET = async () => {
  const list = await DataSourceInstance.getArticles()
  return new NextResponse(JSON.stringify(list))
}
