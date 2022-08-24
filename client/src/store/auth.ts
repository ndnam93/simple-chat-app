import create from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/user'

interface AuthState {
  user: Partial<User>
  accessToken: string
  refreshToken: string
  setTokens: (accessToken: string, refreshToken: string) => void
  setUser: (user: User) => void
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
      setUser: (user: User) =>
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
