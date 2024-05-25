import { MinioBucket } from './MinioStore'

interface ICounts {
  articles: number
  tag: number
}

type TCounts = ICounts & { [key: string | number]: any }

interface IData {
  articles: string[]
  tag: string[]
}

interface IDataSource {
  counts: TCounts
  data: IData
}

const initialData = (): IDataSource => ({
  counts: { articles: 0, tag: 0 },
  data: { articles: [], tag: [] }
})

export default class DbStore {
  private bucket: MinioBucket
  private dataSourceName = 'datasource.json'
  private store: IDataSource
  constructor(bucket: MinioBucket) {
    this.bucket = bucket
    this.store = initialData()
    this.initial()
  }

  initial = async () => {
    const dataJsonString = await this.bucket.getString(this.dataSourceName)
    try {
      this.store = JSON.parse(dataJsonString)
    } catch (error) {
      console.log(error)
    }
  }

  save = async () => {
    const jsonString = JSON.stringify(this.store)
    await this.bucket.putObject(this.dataSourceName, jsonString)
  }

  getTable = (tableName: keyof ICounts) => {
    return this.store.data[tableName]
  }

  update = async (tableName: keyof ICounts, value: string) => {
    const table = this.store.data[tableName]
    const dataSet = new Set(table)
    if (dataSet.has(value)) return
    dataSet.add(value)
    const list = Array.from(dataSet)
    this.store.counts[tableName] = list.length
    this.store.data[tableName] = list
    this.save()
  }

  delete = async (tableName: keyof ICounts, value: string) => {
    const temp = this.store.data[tableName]
    const dataSet = new Set(temp)
    if (!dataSet.has(value)) return
    dataSet.delete(value)
    const list = Array.from(dataSet)
    this.store.counts[tableName] = list.length
    this.store.data[tableName] = list
    this.save()
  }
}
