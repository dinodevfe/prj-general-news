import DataSource from './base'
import RawDataMinioStore from './RawDataMinioStore'

export const DataSourceInstance: DataSource = new RawDataMinioStore()
