import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://x.com/sebdoestweets" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mx-2">X</a>
          <a href="https://github.com/sebbyrule" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mx-2">GitHub</a>
          <a href="https://discord.com/users/sebbyrule" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mx-2">Discord</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer