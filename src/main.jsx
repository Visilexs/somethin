import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginGate from './LoginGate'
import ErrorBoundary from './ErrorBoundary'
import { AppProvider } from './AppContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LoginGate>
        <AppProvider>
          <App />
        </AppProvider>
      </LoginGate>
    </ErrorBoundary>
  </React.StrictMode>
)
