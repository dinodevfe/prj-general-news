import clientPromise, { client } from './mongodb'

if (!process.env.DATABASE_NAME) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_NAME"')
}

export enum ECollection {
  Article = 'article',
  Tag = 'tag'
}

export const MongoDBConnection = async (name: ECollection) => {
  const databaseName = process.env.DATABASE_NAME
  const connector = await clientPromise
  return connector.db(databaseName).collection(name)
}
