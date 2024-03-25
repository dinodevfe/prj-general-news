import { type NextRequest } from 'next/server'
import { NewsListFake } from './fake-data'

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(NewsListFake))
}

