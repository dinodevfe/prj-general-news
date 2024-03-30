import { Sleep } from '@/helpers'
import { NewsListFake } from '../../fake-data'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const item = NewsListFake.find((e) => e.id === slug)
  await Sleep(1000)
  if (!item) return new Response()
  return new Response(JSON.stringify(item))
}
