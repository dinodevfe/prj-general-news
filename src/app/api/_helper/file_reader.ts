// utils/readFiles.js
import { IArticleDTO } from '@/models'
import fs from 'fs'
import path, { parse, basename, extname } from 'path'

export const readTxtFile = (filename: string) => {
  const filePath = path.join(process.cwd(), 'data', `${filename}.txt`)
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return fileContent
  } catch (error) {
    console.error(`Error reading ${filename}.txt: `, error)
    return null
  }
}

export const readJsonFile = (filename: string) => {
  const filePath = path.join(process.cwd(), 'data', `${filename}.json`)
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading ${filename}.json: `, error)
    return null
  }
}

const readFileToJson = (filePath: string) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return null
  }
}

export const getAllSubdirectories = (folderPath: string) => {
  try {
    const items = fs.readdirSync(folderPath)
    const subdirectories: string[] = []
    items.forEach((item) => {
      const itemPath = path.join(folderPath, item)
      const stat = fs.statSync(itemPath)
      if (stat.isDirectory()) {
        subdirectories.push(item)
        const subSubdirectories = getAllSubdirectories(itemPath)
        subdirectories.push(...subSubdirectories.map((subdir) => path.join(item, subdir)))
      }
    })
    return subdirectories
  } catch (error) {
    console.error('Error reading subdirectories:', error)
    return []
  }
}

const getAllContents = (folderPath: string) => {
  try {
    const items = fs.readdirSync(folderPath)
    const contents: string[] = []
    items.forEach((item) => {
      const itemPath = path.join(folderPath, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory() || stat.isFile()) {
        contents.push(item)
      }
    })
    return contents
  } catch (error) {
    console.error('Error reading contents:', error)
    return []
  }
}

const getFileExtension = (url: string) => {
  if (url === null) return
  const parsedUrl = parse(url)
  const name = parsedUrl.name
  const extension = parsedUrl.ext.split('?')[0]
  return { name, extension }
}

const handleContent = (data: string[], dirName: string) => {
  const regex = new RegExp(/\b(?:https?:\/\/|www\.)\S+\b/)
  const resultContent: { text: string; type?: string; sub?: string }[] = []
  let link: { text: string; type: string; sub: string } | null = null
  for (const item of data) {
    const urls: string[] = item.match(regex) || []
    if (urls.length > 0) {
      const fExtentsion = getFileExtension(item)
      const text = fExtentsion ? fExtentsion.name + fExtentsion.extension : item
      // link = { text: `${dirName}\\${text}`, type: 'img', sub: '' }
      link = { text: text, type: 'img', sub: '' }
    } else if (link !== null) {
      if (typeof link.sub !== 'undefined') {
        link.sub = item
        resultContent.push(link)
        link = null
      }
    } else {
      resultContent.push({ text: item })
    }
  }
  return resultContent
}

interface IContent {
  title?: string
  author?: string
  description?: string
  content?: string
}

const getArticleContentByPath = (dirPath: string, fileName: string) => {
  const filePath = path.join(dirPath, fileName)
  try {
    const data: IContent = {}
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const lines = fileContent
      .split('\n')
      .filter((e) => Boolean(e))
      .map((e) => e.trim())
    const contents: string[] = []
    lines.forEach((line, index) => {
      // console.log(`Line ${index + 1}: ${line}`)
      if (index === 0) {
        data.title = line
      } else if (index === 1) {
        data.description = line
      } else if (index === lines.length - 1) {
        data.author = line
      } else {
        contents.push(line)
      }
    })
    data.content = JSON.stringify(handleContent(contents, dirPath))
    return data
  } catch (error) {
    console.error('Error processing .txt file:', filePath)
    // console.error(error)
    return {}
  }
}

interface IInfo {
  id: string
  url: string
  image: string
  date_created_at: string
  article_type: string
  newspaper_origin: string
  newspaper_origin_url: string
}

const filenameUnused = ['content.txt', 'info.txt']
export const getInfoArticle = (folderPath: string): IArticleDTO => {
  const infoPath = path.join(folderPath, filenameUnused[1])
  const info: IInfo = readFileToJson(infoPath)
  const content = getArticleContentByPath(folderPath, filenameUnused[0])
  return {
    articleId: info.id,
    createdDate: info.date_created_at,
    imageUrl: info.image,
    title: content.title ?? '',
    author: content.author ?? '',
    content: content.content ?? '[]',
    originUrl: info.url,
    sourceTitle: info.newspaper_origin,
    sourceUrl: info.newspaper_origin_url,
    status: 'Pending',
    tag: ''
  }
}

export const deleteFolderByName = (parentFolder: string, folderName: string) => {
  const folderPath = path.join(parentFolder, folderName)
  try {
    if (!fs.existsSync(folderPath)) {
      throw new Error(`Folder "${folderName}" does not exist.`)
    }
    fs.rmdirSync(folderPath, { recursive: true })
  } catch (error: any) {
    console.error(`Error deleting folder "${folderName}":`, error.message)
  }
}
