import React from 'react'
import Hero from '@/components/Hero'
const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        {/* Add logic to display recent articles */}
      </div>
    </div>
  )
}

export default Home