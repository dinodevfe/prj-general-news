import * as Minio from 'minio'

interface IMinioStore {
  endpoint: string
  accessKey: string
  secretKey: string
}

export class MinioStore {
  client: Minio.Client
  constructor(init: IMinioStore) {
    this.client = new Minio.Client({
      endPoint: init.endpoint,
      port: 9000,
      useSSL: true,
      accessKey: init.accessKey,
      secretKey: init.secretKey
    })
  }

  bucket = (bucketName: string) => {
    return new MinioBucket(this.client, bucketName)
  }
}

export class MinioBucket {
  client: Minio.Client
  private bucket: string
  constructor(client: Minio.Client, bucketName: string) {
    this.client = client
    this.bucket = bucketName
  }

  createBucket = async () => {
    const isExists = await this.client.bucketExists(this.bucket)
    if (isExists) return
    await this.client.makeBucket(this.bucket)
  }

  listObjects = async () => {
    return new Promise<Minio.BucketItem[]>(async (resolve, reject) => {
      let list: Minio.BucketItem[] = []
      const stream = this.client.listObjectsV2(this.bucket, 'articles', true)
      stream.on('data', (data) => {
        list.push(data)
      })
      stream.on('end', () => {
        resolve(list)
      })
      stream.on('error', (error) => {
        reject(error)
      })
    })
  }

  putObject = async (fileName: string, jsonString: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await this.client.putObject(this.bucket, fileName, jsonString)
        resolve(stream)
      } catch (error) {
        reject(error)
      }
    })
  }

  removeObject = async (fileName: string) => {
    await this.client.removeObject(this.bucket, fileName)
  }

  getBuffer = async (folderName: string): Promise<Buffer> => {
    const stream = await this.client.getObject(this.bucket, folderName)
    return new Promise((res, rej) => {
      let contents: Buffer[] = []
      stream.on('data', function (chunk) {
        contents.push(chunk)
      })
      stream.on('end', function () {
        res(Buffer.concat(contents))
      })
      stream.on('error', function (err) {
        console.log(err)
        rej(err)
      })
    })
  }

  getString = async (fileName?: string): Promise<string> => {
    if (!fileName) return ''
    const dataStream = await this.getBuffer(fileName)
    return dataStream.toString()
  }

  getPresignedUrl = async (fileName: string) => {
    const temp = this.client.presignedUrl('GET', this.bucket, fileName)
    return temp
  }
}
