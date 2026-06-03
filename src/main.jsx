import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import LoginGate from './LoginGate'
import ErrorBoundary from './ErrorBoundary'
import { AppProvider } from './AppContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <LoginGate>
          <AppProvider>
            <App />
          </AppProvider>
        </LoginGate>
      </MotionConfig>
    </ErrorBoundary>
  </React.StrictMode>
)
