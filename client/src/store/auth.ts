import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Tokens } from '../types/tokens'
import { User } from '../types/user'

interface AuthState {
  user: Partial<User>
  tokens: Partial<Tokens>
  setTokens: (tokens: Tokens) => void
  setUser: (user: User) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {},
      tokens: {},
      setTokens: (tokens: Tokens) =>
        set((state: AuthState) => ({ ...state, tokens })),
      setUser: (user: User) => set((state: AuthState) => ({ ...state, user })),
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
