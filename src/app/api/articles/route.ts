import { NextResponse } from 'next/server'
import { DataSourceInstance } from '@/data-source'

export const GET = async () => {
  // const list = await DataSourceInstance.getArticles()
  const res = await fetch(`http://localhost:3000/api/client/articles`, {
    method: 'GET',
    headers: { accept: 'application/json', 'content-type': 'application/json' }
  })
  const data = await res.json()
  return new NextResponse(JSON.stringify(data))
}
