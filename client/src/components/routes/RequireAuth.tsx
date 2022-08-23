import { PropsWithChildren } from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'

import { useAuth } from '../../providers/AuthProvider'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
