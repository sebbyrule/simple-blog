import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold"><Image src="/SDM_logo.png" alt="Vercel Logo" width={50} height={50} className="rounded" /></Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
          <li><Link href="/articles" className="hover:text-gray-300 transition-colors">Articles</Link></li>
          <li><Link href="/howto" className="hover:text-gray-300 transition-colors">How-Tos</Link></li>
          <li><Link href="/about" className="hover:text-gray-300 transition-colors">About</Link></li>
          <li><DarkModeToggle /></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header