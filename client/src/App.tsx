import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './routes'
import AuthProvider from './providers/AuthProvider'
import { HttpProvider } from './providers/HttpProvider'

const Routes = () => useRoutes(routes)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HttpProvider>
          <Routes />
        </HttpProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
