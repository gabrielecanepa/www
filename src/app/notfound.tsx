import Link from 'next/link'

import { type Component } from '@/utils'

const NotFound: Component = () => (
  <div>
    <h2>{'Not Found'}</h2>
    <p>{'Could not find requested resource'}</p>
    <Link href="/">{'Return Home'}</Link>
  </div>
)

export default NotFound
