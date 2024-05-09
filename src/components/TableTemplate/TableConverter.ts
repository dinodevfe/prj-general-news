import { GridFilterModel, GridFilterItem, GridLogicOperator, GridSortModel } from '@mui/x-data-grid'
import { EOperator, IConverterConfig, IFetchModel, Dictionary } from './type'

interface IResultFilterGraphql {
  take?: number
  skip?: number
  filter?: string
  sort?: Dictionary<string>[]
}

interface IKeyGraphqlResult extends IResultFilterGraphql {
  searchKeys?: string[]
}

type TPaginationToFilter = (params: { pageSize: number; page: number }) => {
  filter: { take?: number; skip?: number }
  key: string
}

class TableConverterBase {
  graphql = (model: Partial<IFetchModel>, config: IConverterConfig) => {
    const key = this.graphqlKey(model, config)
    const page: number = model.PaginationModel?.page ?? config.pagination?.page ?? 0
    const take: number = model.PaginationModel?.pageSize ?? config.pagination?.pageSize ?? 0
    const filterResult: IResultFilterGraphql = { skip: page * take, take }

    const filter = this.convertFilterModel(model, config)
    const sort = this.convertSortModel(model.GridSortModel)
    if (filter) filterResult.filter = filter
    if (sort && sort.length > 0) filterResult.sort = sort

    return { filter: filterResult, key }
  }

  private graphqlKey = (model: Partial<IFetchModel>, config: IConverterConfig) => {
    const page: number = model.PaginationModel?.page ?? config.pagination?.page ?? 0
    const take: number = model.PaginationModel?.pageSize ?? config.pagination?.pageSize ?? 0
    const searchKeys: string[] | undefined = model.FilterModel?.quickFilterValues
    const filter = TableConverter.convertFilterOperator(model.FilterModel)
    const sort = TableConverter.convertSortModel(model.GridSortModel)

    const keys: IKeyGraphqlResult = { skip: page * take, take }
    if (filter) keys.filter = filter
    if (sort && sort.length > 0) keys.sort = sort
    if (searchKeys && searchKeys.length > 0) keys.searchKeys = searchKeys

    return btoa(JSON.stringify(keys))
  }

  paginationToFilter: TPaginationToFilter = (params) => {
    const filter = { skip: params.page * params.pageSize, take: params.pageSize }
    return { filter, key: btoa(JSON.stringify(filter)) }
  }

  private mapOperator = (item: GridFilterItem) => {
    if (!item.operator || !item.value) return ''
    switch (parseInt(item.operator)) {
      case EOperator.Contains:
        return `${item.field}.contains("${item.value}")`
      case EOperator.Equal:
        return `${item.field}=="${item.value}"`
      case EOperator.NotEqual:
        return `${item.field}!="${item.value}"`
      case EOperator.GreaterThan:
        return `${item.field}>"${item.value}"`
      case EOperator.GreaterThanOrEqual:
        return `${item.field}>="${item.value}"`
      default:
        return ''
    }
  }

  private convertSortModel = (model?: GridSortModel): Dictionary<string>[] => {
    let sort: Dictionary<string>[] = []
    const idDoNotAddSort = model && model[0] && model[0].field && model[0].field.includes('.')
    if (model && model[0] && model[0].sort && !idDoNotAddSort) sort = [{ [model[0].field]: model[0].sort.toUpperCase() ?? 'ASC' }]
    return sort
  }

  private convertFilterModel = (model: Partial<IFetchModel>, config: IConverterConfig): string => {
    const filterSearch = this.converSearchFilterModel({
      searchKeys: model.FilterModel?.quickFilterValues,
      searchOptions: config.searchOptions.map<string>((e) => e.toString())
    })
    const filterOperator = this.convertFilterOperator(model.FilterModel)
    let concatenation = filterSearch && filterOperator ? ' || ' : ''
    return `${filterSearch ? filterSearch + concatenation : ''}${filterOperator ?? ''}`
  }

  private convertFilterOperator = (model?: GridFilterModel): string => {
    if (!model) return ''
    const filters = model.items.map(this.mapOperator)
    let concatenation = ' || '
    if (model.logicOperator === GridLogicOperator.And) concatenation = ' && '
    return filters.filter((e) => !!e).join(concatenation)
  }

  private converSearchFilterModel = (params: { searchKeys?: any[]; searchOptions: string[] }) => {
    const arr = (params.searchKeys ?? []).map((e) => {
      return e ? params.searchOptions.map((s) => `${s}.contains("${e}")`).join(' || ') : undefined
    })
    return arr.filter((e) => !!e).join(' || ')
  }
}
export const TableConverter = new TableConverterBase()
export default TableConverter
