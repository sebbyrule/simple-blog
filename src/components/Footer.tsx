import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
export default Footer