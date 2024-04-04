import { IArticleDTO } from '@/models'
import { CreateTableTemplate, MapOperators } from 'partner-library-mfe/components/TableTemplate'

const fomaterDate = (params?: any) => (params ? new Date(params).toLocaleString() : '')

export const CreateTable = () => {
  return CreateTableTemplate<IArticleDTO & { actions?: string }>('Client', {
    getRowId: (x) => x.id,
    config: {
      id: { flex: 1, type: 'string', headerName: 'Id' },
      title: { flex: 1, type: 'string', headerName: 'Title' },
      sourceTitle: { flex: 1, type: 'string', headerName: 'Chanel' },
      createdDate: {
        flex: 1,
        minWidth: 190,
        type: 'string',
        headerName: 'Created date',
        valueFormatter: (param) => fomaterDate(param.value)
      },
      actions: { minWidth: 150, type: 'string', sortable: false, disableColumnMenu: true, headerName: 'Actions' }
    },
    filterOperators: MapOperators,
    MenuField: 'actions'
  })
}
