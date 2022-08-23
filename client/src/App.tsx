import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './routes'
import AuthProvider from './providers/AuthProvider'

const Routes = () => useRoutes(routes)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
