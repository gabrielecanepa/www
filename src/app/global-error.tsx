'use client'

import { type Component } from '@/utils'

export interface GlobalErrorProps {
  reset: () => void
}

const GlobalError: Component<GlobalErrorProps> = ({ reset }) => (
  <html>
    <body>
      <h2>{'Something went wrong!'}</h2>
      <button onClick={() => reset()}>{'Try again'}</button>
    </body>
  </html>
)

export default GlobalError
