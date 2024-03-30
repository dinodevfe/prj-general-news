import { Sleep } from '@/helpers'
import { NextRequest } from 'next/server'
import { NewsListFake } from '../../fake-data'
import { ISlug } from '@/models'

export const GET = async (request: NextRequest, { params }: ISlug) => {
  await Sleep(500)
  const data = NewsListFake.filter((e) => e.tag === params.slug)
  return new Response(JSON.stringify(data))
}
