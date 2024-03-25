import { NewsListFake } from '../fake-data'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const item = NewsListFake.find((e) => e.id === slug)
  await sleep(1000)
  if (!item) return new Response()
  return new Response(JSON.stringify(item))
}
