import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { Tokens } from '../types/tokens'
import { User } from '../types/user'

interface LoginResponse {
  user: User
  tokens: Tokens
}

interface AuthContextProps {
  user: Partial<User>
  isLogged: boolean
  accessToken: string
  onLogout: () => void
  onLogin: (response: LoginResponse) => void
}

const AuthContext = createContext({
  user: {},
  isLogged: false,
  accessToken: '',
  onLogout: () => {},
  onLogin: () => {}
} as AuthContextProps)

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const { user, tokens, setUser, setTokens, reset } = useAuthStore()
  const accessToken = tokens?.access?.token || ''
  const isLogged = !!accessToken
  let navigate = useNavigate()

  const onLogout = () => {
    reset()
    navigate('/login')
  }

  const onLogin = ({ user, tokens }: LoginResponse) => {
    setUser(user)
    setTokens(tokens)
    navigate('/chat')
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLogged, onLogout, onLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
