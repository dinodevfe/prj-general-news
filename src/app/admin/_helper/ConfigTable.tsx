import { EArticleStatus, IArticleDTO } from '@/models'
import { Typography, styled } from '@mui/material'
import { CreateTableTemplate, MapOperators } from '@/components/TableTemplate'

const StatusColors: { [key in EArticleStatus]: string } = {
  Pending: 'linear-gradient(to right,#0d6efd,#82baff)',
  Approve: 'linear-gradient(to right,#357a38,#1edd9b)',
  Error: 'linear-gradient(to right,#e72134,#eba1a1)',
  Reject: 'linear-gradient(to right,#e72134,#eba1a1)'
}

const fomaterDate = (params?: any) => (params ? new Date(params).toLocaleString() : '')

export const CreateTable = () => {
  return CreateTableTemplate<IArticleDTO & { actions?: string }>('Client', {
    getRowId: (x) => x.articleId,
    config: {
      articleId: { type: 'string', headerName: 'Id' },
      title: { flex: 1, type: 'string', headerName: 'Title' },
      sourceTitle: { type: 'string', headerName: 'Chanel' },
      tag: { type: 'string', headerName: 'Tag' },
      dateRawCrawled: {
        minWidth: 190,
        type: 'dateTime',
        headerName: 'Crawled date',
        valueFormatter: (param) => fomaterDate(param.value)
      },
      dateApproved: {
        minWidth: 190,
        type: 'dateTime',
        headerName: 'Approved date',
        valueFormatter: (param) => fomaterDate(param.value)
      },
      status: {
        minWidth: 100,
        headerName: 'Status',
        type: 'string',
        renderCell: (params) => {
          const value = params.value as EArticleStatus
          const color = value === EArticleStatus.Approve ? StatusColors.Approve : StatusColors.Pending
          return <CustomTypography sx={{ background: color }}>{value}</CustomTypography>
        }
      },
      actions: { minWidth: 100, type: 'string', sortable: false, disableColumnMenu: true, headerName: 'Actions' }
    },
    filterOperators: MapOperators,
    MenuField: 'actions'
  })
}

const CustomTypography = styled(Typography)({
  borderRadius: '4px',
  fontSize: '0.8rem',
  padding: '4px 7px',
  fontWeight: '400',
  minWidth: '70px',
  textAlign: 'center',
  color: '#fff',
  flex: '0 0 auto'
})
