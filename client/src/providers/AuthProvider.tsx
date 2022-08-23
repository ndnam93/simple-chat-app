import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { UserInfo } from '../types/user'

interface LoginResponse {
  user: UserInfo
  tokens: {
    access: {
      token: string
      expires: string
    }
    refresh: {
      token: string
      expires: string
    }
  }
}

interface AuthContextProps {
  user: Partial<UserInfo>
  isLogged: boolean
  onLogout: () => void
  onLogin: (response: LoginResponse) => void
}

const AuthContext = createContext({
  user: {},
  isLogged: false,
  onLogout: () => {},
  onLogin: () => {}
} as AuthContextProps)

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const { user, accessToken, setUser, setTokens, reset } = useAuthStore()
  const isLogged = !!accessToken
  let navigate = useNavigate()

  const onLogout = () => {
    reset()
    navigate('/login')
  }

  const onLogin = ({ user, tokens }: LoginResponse) => {
    setUser(user)
    setTokens(tokens.access.token, tokens.refresh.token)
    navigate('/chat')
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, onLogout, onLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
