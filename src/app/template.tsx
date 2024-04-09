import { type Component } from '@/utils'

const Template: Component = ({ children }) => {
  const title = 'Hello, Template Page!'

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default Template
