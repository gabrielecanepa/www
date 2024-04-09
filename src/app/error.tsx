'use client'

import { useEffect } from 'react'

import { type Component } from '@/utils'

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: Component<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>{'Something went wrong!'}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {'Try again'}
      </button>
    </div>
  )
}

export default Error
