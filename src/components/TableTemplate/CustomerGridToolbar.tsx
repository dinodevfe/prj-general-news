import React from 'react'
import { GridFilterItem, GridToolbar, useGridApiContext } from '@mui/x-data-grid'

export const CustomerGridToolbar: React.FC<any> = (props) => {
  const apiRef = useGridApiContext()
  const upsertFilterItem = React.useCallback(
    (item: GridFilterItem) => {
      const gridState = apiRef.current.state
      if (item.id) {
        const index = gridState.filter.filterModel.items.findIndex((x) => x.id === item.id)
        if (index >= 0) {
          gridState.filter.filterModel.items[index] = Object.assign({}, gridState.filter.filterModel.items[index], item)
        }
      } else {
        const field = item.field ? item.field : gridState.columns.orderedFields[0]
        const column = gridState.columns.lookup[field]
        const Temp = {
          id: Math.round(1e5 * Math.random()),
          columnField: field,
          operatorValue: column.filterOperators ? column.filterOperators[0].value : ''
        }
        gridState.filter.filterModel.items.push(Object.assign({}, Temp, item))
      }
      apiRef.current.setFilterModel({ ...gridState.filter.filterModel, items: [...gridState.filter.filterModel.items] })
      const apiObject = apiRef.current as any
      const key_fun = Object.keys(apiObject).find((x) => /(_applyFilters)/.test(x)) ?? ''
      apiObject[key_fun]()
    },
    [apiRef]
  )
  //componentdidmount
  React.useEffect(() => {
    apiRef!.current.upsertFilterItem = upsertFilterItem
  }, [apiRef, upsertFilterItem])

  return <GridToolbar {...props} />
}
