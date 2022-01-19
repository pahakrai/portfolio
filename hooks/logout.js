import { clearToken } from '../lib/auth'
import { queryClient } from '../utils/react-query-client'

export const logout = () => {
  clearToken()
  queryClient.clear()
}
