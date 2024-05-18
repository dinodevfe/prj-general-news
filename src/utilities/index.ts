if (!process.env.IMAGE_API_URI) {
  throw new Error('Invalid/Missing environment variable: "IMAGE_API_URI"')
}

export default class Utilities {
  static getImageUri = (filename: string) => {
    return `${process.env.IMAGE_API_URI}/${filename}`
  }
}
