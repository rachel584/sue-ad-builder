import React, { useState } from 'react'
import { colors, fonts } from './brand'

interface Props {
  children: React.ReactNode
}

// Simple client-side password gate — not enterprise security,
// just keeps casual visitors out of the internal ad builder.
const PASSWORD = 'sue'

export const PasswordGate: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('sue-ad-auth') === 'true'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.toLowerCase().trim() === PASSWORD) {
      sessionStorage.setItem('sue-ad-auth', 'true')
      setAuthenticated(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (authenticated) return <>{children}</>

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.lightCoral2,
      fontFamily: fonts.body,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '48px 40px',
        borderRadius: 8,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        textAlign: 'center',
        width: 360,
      }}>
        <img
          src={`${import.meta.env.BASE_URL}sue-logo-academy.png`}
          alt="SUE Behavioural Design Academy"
          style={{ height: 40, marginBottom: 32 }}
        />
        <h2 style={{
          fontFamily: fonts.headline,
          fontSize: 22,
          color: colors.black,
          margin: '0 0 8px',
        }}>
          Ad Builder
        </h2>
        <p style={{ fontSize: 14, color: colors.darkGrey, margin: '0 0 28px' }}>
          Internal tool — enter password to continue
        </p>
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false) }}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 16,
            border: `2px solid ${error ? colors.coral : '#ddd'}`,
            borderRadius: 4,
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: 16,
            transition: 'border-color 0.15s',
          }}
        />
        {error && (
          <p style={{ fontSize: 13, color: colors.coral, margin: '-8px 0 12px' }}>
            Incorrect password
          </p>
        )}
        <button type="submit" style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: colors.coral,
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Enter
        </button>
      </form>
    </div>
  )
}
