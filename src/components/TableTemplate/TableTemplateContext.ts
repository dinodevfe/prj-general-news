import { createContext } from 'react'
import { GridCallbackDetails, GridFilterModel, GridPaginationModel, GridRowModel, GridSortModel } from '@mui/x-data-grid'
import { IFetchPagination } from './type'

export interface ITableTemplateState<T = any> {
  selectionIds?: GridRowModel
  details?: GridCallbackDetails
  PageInfo: IFetchPagination<T>
  isLoading: boolean
  PaginationModel?: GridPaginationModel
  FilterModel?: GridFilterModel
  GridSortModel?: GridSortModel
}

export interface ITableTemplateContext {
  state: ITableTemplateState<any>
}
export const TableTemplateContext = createContext<ITableTemplateContext>({} as any)
