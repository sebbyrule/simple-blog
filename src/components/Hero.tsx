import React from 'react'

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to My Blog</h1>
        <p className="text-xl text-gray-600">Exploring software engineering, web development, and more.</p>
      </div>
    </div>
  )
}

export default Hero