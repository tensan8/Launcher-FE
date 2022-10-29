import { useState } from 'react'

export default function SessionChecker (): any {
  const getSessionId = (): any => {
    return sessionStorage.getItem('id')
  }

  const [sessionId, setSessionId] = useState(getSessionId())

  const saveSessionId = (sessionId: any): void => {
    sessionStorage.setItem('id', sessionId)
    setSessionId(sessionId)
  }

  const resetSessionId = (): void => {
    sessionStorage.clear()
    setSessionId(null)
  }

  return {
    sessionId,
    setSessionId: saveSessionId,
    resetSessionId
  }
}
