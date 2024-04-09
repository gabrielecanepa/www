import { type Metadata } from 'next'

import { type Component } from '@/utils'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard Page',
}

const Dashboard: Component = () => <h1>{'Hello, Dashboard Page!'}</h1>

export default Dashboard

