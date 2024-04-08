import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface IParams {
  params: {
    id: string
    name: string
  }
}

export const GET = async (req: NextRequest, { params }: IParams) => {
  try {
    if (!process.env.DIR_PATH) {
      throw new Error('Invalid/Missing environment variable: "DIR_PATH"')
    }
    const imagePath = path.join(process.env.DIR_PATH, params.id, params.name)
    const imageFile = fs.readFileSync(imagePath)
    return new Response(imageFile)
  } catch (error) {
    return new Response(null)
  }
}
