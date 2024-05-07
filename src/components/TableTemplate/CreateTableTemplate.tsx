import React, { Component, ComponentType } from 'react'
import { Box, SxProps, Theme, styled } from '@mui/material'
import { GridCallbackDetails, GridFilterModel, GridFeatureMode, GridValidRowModel } from '@mui/x-data-grid'
import { DataGrid, DataGridProps, GridSortModel, GridColDef, GridRowModel, GridPaginationModel } from '@mui/x-data-grid'
import { DeepClone } from './helper'
import { CustomerGridToolbar } from './CustomerGridToolbar'
import { CustomGridFilterPanel } from './CustomGridFilterPanel'
import { IFetchModel, ITableMode, ITableOption, ITableTemplatePropBases } from './type'
import { ITableTemplateContext, ITableTemplateState, TableTemplateContext } from './TableTemplateContext'
import NoRowsOverlay from './NoRowsOverlay'

type ITableTemplateProps<T extends GridValidRowModel, Key extends keyof ITableMode<T>> = ITableTemplatePropBases<T> &
  ITableMode<T>[Key] & {
    sxWrapper?: SxProps<Theme>
    ItemRowMenu?: ComponentType<React.PropsWithChildren<any>>
  }

export declare type TypeTemplateTableRef<TModel extends GridValidRowModel> = React.JSXElementConstructor<
  ITableTemplateProps<TModel, keyof ITableMode<TModel>>
>

export const CreateTableTemplate = function <TModel extends GridValidRowModel>(
  mode: keyof ITableMode<TModel>,
  option: ITableOption<TModel>
) {
  const ConfigOption = DeepClone(option)
  return class TableTemplate
    extends Component<ITableTemplateProps<TModel, keyof ITableMode<TModel>>, ITableTemplateState<TModel>>
    implements ITableTemplateContext
  {
    static defaultState: ITableTemplateState<TModel> = {
      PageInfo: { data: [], rowTotal: 0, page: 0, pageSize: 0 },
      isLoading: true
    }
    AbortController?: AbortController

    constructor(props: ITableTemplateProps<TModel, keyof ITableMode<TModel>>) {
      super(props)
      this.state = TableTemplate.defaultState
      this.columns = this.initial()
    }
    generateColumns = () => {
      return Object.keys(ConfigOption.config).map((key) => {
        const opt = { ...ConfigOption.config[key], field: key } as GridColDef
        if (mode === 'Server' && !opt.type && opt.filterable !== false)
          throw new Error(`When mode is Server you need set type for '${key}' column in 'GridColDef'`)
        if (ConfigOption.filterOperators) {
          opt.filterOperators = ConfigOption.filterOperators(opt)
        }
        return opt
      })
    }
    columns: GridColDef<any, any, any>[]
    initial() {
      if (ConfigOption.MenuField) {
        const MenuField =
          typeof ConfigOption.MenuField === 'function' ? ConfigOption.MenuField(ConfigOption) : ConfigOption.MenuField
        const Fieldoption = option.config[MenuField as string]
        const FieldConfig = ConfigOption.config[MenuField as string]
        const { ItemRowMenu: ItemMenu } = this.props
        if (FieldConfig && ItemMenu) {
          FieldConfig.renderCell = (params) => {
            return (
              <ItemMenu data={params.row}>{Fieldoption?.renderCell ? Fieldoption.renderCell(params) : params.value}</ItemMenu>
            )
          }
        }
      }
      return this.generateColumns()
    }

    getPageInfo = () => {
      if ('PageInfo' in this.props && this.props.PageInfo) {
        return this.props.PageInfo
      }
      return this.state.PageInfo
    }

    getPagination = () => {
      const pageInfo = this.getPageInfo()
      return { page: pageInfo.page, pageSize: pageInfo.pageSize }
    }

    GetDataGridProp = () => {
      let _DataGridProp: Omit<DataGridProps, 'columns'>
      if (mode === 'Server') {
        const pageInfo = this.getPageInfo()
        _DataGridProp = {
          initialState: { pagination: { paginationModel: this.getPagination() } },
          rowCount: pageInfo.rowTotal ?? 0,
          rows: pageInfo.data,
          loading: this.state.isLoading,
          onPaginationModelChange: this.onPaginationModelChange,
          onFilterModelChange: this.onServerFilterChange,
          onSortModelChange: this.onSortModelChange,
          filterMode: 'server' as GridFeatureMode,
          paginationMode: 'server' as GridFeatureMode,
          sortingMode: 'server' as GridFeatureMode,
          filterModel: this.state.FilterModel,
          sortModel: this.state.GridSortModel
        }
      } else if (mode === 'Client' && 'data' in this.props) {
        _DataGridProp = {
          rows: this.props.data,
          componentsProps: {
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }
        }
      } else {
        _DataGridProp = { rows: [] }
      }
      return _DataGridProp
    }

    onRowSelectionModelChange = (rowSelectionModel: GridRowModel, details: GridCallbackDetails) => {
      this.setState({ details: details, selectionIds: rowSelectionModel })
    }

    onServerFilterChange = (model: GridFilterModel, details: GridCallbackDetails<'filter'>) => {
      this.setState({ FilterModel: model, isLoading: true }, () => this.FetchData({ FilterModel: model, details }))
    }

    onPaginationModelChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
      this.setState({ PaginationModel: model, isLoading: true })
      this.FetchData({ PaginationModel: model, details })
    }

    onSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
      this.setState({ GridSortModel: model, isLoading: true })
      this.FetchData({ GridSortModel: model, details })
    }

    FetchData = async (model: Partial<IFetchModel>) => {
      this.AbortController?.abort()
      if (mode === 'Server' && 'ServerOption' in this.props) {
        try {
          this.AbortController = new AbortController()
          const data = await this.props.ServerOption.FetchFilterData(
            Object.assign(
              {},
              {
                PaginationModel: this.state.PaginationModel,
                FilterModel: this.state.FilterModel,
                GridSortModel: this.state.GridSortModel,
                abort: this.AbortController.signal
              },
              model
            )
          )
          if (this.props.IsInnerState === true) {
            this.setState({ isLoading: false, PageInfo: data ?? TableTemplate.defaultState.PageInfo })
          } else {
            this.setState({ isLoading: false })
          }
        } catch {
          this.setState({ isLoading: false })
        }
      }
    }

    isServerSide = () => mode === 'Server'

    async componentDidMount() {
      if (mode === 'Server' && 'ServerOption' in this.props) {
        this.AbortController?.abort()
        if (mode === 'Server' && 'ServerOption' in this.props) {
          try {
            this.AbortController = new AbortController()
            const data = await this.props.ServerOption.FetchInitialData()
            this.setState({ isLoading: false, PageInfo: data ?? TableTemplate.defaultState.PageInfo })
          } catch {
            this.setState({ isLoading: false })
          }
        }
      }
    }

    render() {
      const CRUDPannel = this.props.CRUDPannel || (() => <></>)
      return (
        <TableTemplateContext.Provider value={this}>
          <Wrapper sx={this.props.sxWrapper}>
            {<CRUDPannel />}
            <DataGrid
              // row
              pagination
              getRowId={ConfigOption.getRowId}
              columns={this.columns}
              {...this.GetDataGridProp()}
              style={{ border: 0 }}
              checkboxSelection={true}
              sx={{
                border: 0,
                '& .MuiTablePagination-root .MuiToolbar-root > p': { margin: 0 },
                '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700, color: '#3c3c3c' }
              }}
              {...(this.props.InnerProps ?? {})}
              slots={{
                toolbar: CustomerGridToolbar,
                filterPanel: (props: any) => <CustomGridFilterPanel {...props} />,
                noRowsOverlay: NoRowsOverlay,
                ...this.props.InnerProps?.slots
              }}
              slotProps={{
                toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } },
                ...this.props.InnerProps?.slotProps
              }}
            />
          </Wrapper>
        </TableTemplateContext.Provider>
      )
    }
  }
}

const Wrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  width: '100%'
})
