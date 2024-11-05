import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                SebDoesMedia
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Master Programming, Maximize Productivity, and Discover Insightful Teachings
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you're a seasoned coder or just starting your journey, 
              SebDoesMedia is here to inspire and guide you every step of the way.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/articles" 
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
              >
                Read Articles
              </Link>
              <Link 
                href="/howto" 
                className="px-6 py-3 border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                View How-Tos
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-3xl opacity-20"></div>
              <Image 
                src="/SebDoesMedia.png" 
                alt="SebDoesMedia" 
                width={400} 
                height={400} 
                className="relative rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero