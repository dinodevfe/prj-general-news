import { IArticleDTO } from '@/models'
import { ApiAlertContext } from 'partner-library-mfe/components/AlertGlobal'

class ArticlesService {
  fetchRawData = async (): Promise<IArticleDTO[]> => {
    try {
      const res = await fetch(`/api/raw-data`)
      if (!res.ok) return []
      return await res.json()
    } catch (error) {
      return []
    }
  }

  deleteRaw = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/raw-data', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!res.ok) return false
      ApiAlertContext.ApiAlert?.PushSuccess('Raw folder successfully deleted!')
      return true
    } catch (error) {
      ApiAlertContext.ApiAlert?.PushWarning('Raw folder delete failed!')
      return false
    }
  }

  delete = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!res.ok) return false
      ApiAlertContext.ApiAlert?.PushSuccess('Successfully deleted!')
      return true
    } catch (error) {
      ApiAlertContext.ApiAlert?.PushWarning('Delete failed!')
      return false
    }
  }

  approve = async (param: IArticleDTO) => {
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
      })
      if (!res.ok) new Error('Something wrong!')
      ApiAlertContext.ApiAlert?.PushSuccess('Successfully approved!')
    } catch (error) {
      ApiAlertContext.ApiAlert?.PushWarning('Approve failed!')
      return false
    }
  }

  changeType = async (param: IArticleDTO) => {
    try {
      const res = await fetch('/api/news', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
      })
      if (!res.ok) new Error('Something wrong!')
      ApiAlertContext.ApiAlert?.PushSuccess('Successfully changed!')
    } catch (error) {
      ApiAlertContext.ApiAlert?.PushWarning('Change failed!')
      return false
    }
  }
}

export default new ArticlesService()
