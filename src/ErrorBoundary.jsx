import { Component } from 'react'
import { KopeckySymbol } from './components/Icons'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In a real app this would report to a service
    console.error('Kopecky error boundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#060805',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <div style={{ marginBottom: 28, opacity: 0.5 }}>
            <KopeckySymbol size={48} glow={false} />
          </div>
          <div style={{
            fontFamily: "'Cinzel Decorative',serif",
            fontSize: 'clamp(20px,4vw,32px)', color: 'var(--am, #c8a84a)',
            marginBottom: 16,
          }}>
            Something Has Gone Wrong.
          </div>
          <p style={{
            fontFamily: "'EB Garamond',serif", fontSize: 16, fontStyle: 'italic',
            color: 'rgba(213,206,171,.6)', maxWidth: 440, lineHeight: 1.8, marginBottom: 28,
          }}>
            An error has occurred within the scripture. Kopecky would say this is a local
            failure within a broader field of correctness. The field remains. Reload to return to it.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.22em',
              textTransform: 'uppercase', color: 'rgba(168,200,74,.9)',
              background: 'rgba(168,200,74,.07)', border: '1px solid rgba(168,200,74,.3)',
              padding: '14px 32px', cursor: 'pointer',
            }}
          >
            Restore the Scripture
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
