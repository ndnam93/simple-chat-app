import { Navigate, RouteObject } from 'react-router-dom'
import RequireAuth from '../components/routes/RequireAuth'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/chat',
    element: (
      <RequireAuth>
        <Chat />
      </RequireAuth>
    )
  }
]

export default routes
