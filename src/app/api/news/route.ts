import { type NextRequest } from 'next/server'
import { NewsListFake } from '../fake-data'
import { Sleep } from '@/helpers'

export const GET = async (request: NextRequest) => {
  await Sleep(1000)
  return new Response(JSON.stringify(NewsListFake))
}
