import { DataSourceInstance } from '@/data-source'
import { NextRequest, NextResponse } from 'next/server'

interface IGetParams {
  params: { id: string }
}

export const GET = async (request: NextRequest, { params }: IGetParams) => {
  const { id } = params
  if (!id) throw Error('No images found!')
  const objectName = `images/${id}`
  try {
    const obj = await DataSourceInstance.presignedUrl(objectName)
    return NextResponse.redirect(obj)
  } catch (err) {
    console.error(err)
    // res.status(500).send('Error generating URL')
  }
}
