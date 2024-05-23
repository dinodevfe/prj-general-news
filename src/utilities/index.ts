import { formatTimeAgo } from './Timer'

export default class Utilities {
  static getImageUri = (filename?: string) => {
    if (!filename) return '/image-default.jpg'
    return `${process.env.IMAGE_API_URI ?? '/api/images'}/${filename}`
  }

  static formatTimeAgo = formatTimeAgo

  static getRandomNumberFromArray = (numbers: number[], numberDefault?: number) => {
    if (numbers.length === 0) {
      return numberDefault ?? 0
    }
    const randomIndex = Math.floor(Math.random() * numbers.length)
    return numbers[randomIndex]
  }

  static Sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
