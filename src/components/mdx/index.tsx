import React from 'react'

export const Callout: React.FC<{ children: React.ReactNode; type?: 'info' | 'warning' | 'error' }> = ({ children, type = 'info' }) => {
  const colors = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700'
  }
  return (
    <div className={`p-4 my-4 border-l-4 ${colors[type]}`}>
      {children}
    </div>
  )
}

export const CodeBlock: React.FC<React.ComponentPropsWithoutRef<'pre'>> = (props) => {
  return (
    <pre {...props} className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
      <code>{props.children}</code>
    </pre>
  )
}

const MDXComponents = {
  Callout,
  pre: CodeBlock,
}

export default MDXComponents