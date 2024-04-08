import clientPromise from '@/lib/mongodb'

export const GET = async () => {
  try {
    const connector = await clientPromise
    const collection = connector.db('newspaper_project').collection('article')
    const data = await collection.find({}).toArray()
    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify([]))
  }
}
