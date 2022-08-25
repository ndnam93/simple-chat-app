import axios from 'axios'
import { Provider } from 'use-http'
import { useAuthStore } from '../store/auth'
import { Tokens } from '../types/tokens'

export const HttpProvider = ({ children }) => {
  const { tokens, setTokens } = useAuthStore()

  const options = {
    interceptors: {
      request: async ({ options, url, path, route }) => {
        let accessToken = tokens?.access?.token
        if (new Date() >= new Date(tokens?.access?.expires || '')) {
          const newTokens: Tokens = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/auth/refresh-tokens`,
            { refreshToken: tokens.refresh?.token }
          )
          setTokens(newTokens)
          accessToken = newTokens.access.token
        }
        options.headers.Authorization = `Bearer ${accessToken}`
        return options
      }
    }
  }

  return (
    <Provider url={`${import.meta.env.VITE_API_URL}/v1`} options={options}>
      {children}
    </Provider>
  )
}
