import { NextResponse } from 'next/server'
import { DataSourceInstance } from '@/data-source'

export const GET = async () => {
  const list = await DataSourceInstance.bucket.listObjects()
  return new NextResponse(JSON.stringify(list))
}
