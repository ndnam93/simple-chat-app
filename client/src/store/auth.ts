import create from 'zustand'
import { persist } from 'zustand/middleware'
import { UserInfo } from '../types/user'

interface AuthState {
  user: Partial<UserInfo>
  accessToken: string
  refreshToken: string
  setTokens: (accessToken: string, refreshToken: string) => void
  setUser: (user: UserInfo) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {},
      accessToken: '',
      refreshToken: '',
      setTokens: (accessToken: string, refreshToken: string) =>
        set((state: AuthState) => ({ ...state, accessToken, refreshToken })),
      setUser: (user: UserInfo) =>
        set((state: AuthState) => ({ ...state, user })),
      reset: () =>
        set((state: AuthState) => ({
          ...state,
          user: {},
          accessToken: '',
          refreshToken: ''
        }))
    }),
    {
      name: 'auth-storage'
    }
  )
)
