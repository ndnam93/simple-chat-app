
import { Provider } from 'use-http'
import { useAuthStore } from '../store/auth'

export const HttpProvider = ({ children }) => {
  const { accessToken } = useAuthStore()

  return (
    <Provider
      url={`${import.meta.env.VITE_API_URL}/v1`}
      options={{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }}
    >
      {children}
    </Provider>
  )
}