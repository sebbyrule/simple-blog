import React from 'react'
import Image from 'next/image'

const Hero: React.FC = () => {
  return (
    <div className="py-20 container mx-auto text-center flex flex-col md:flex-row items-center">
      <div className="md:w-2/3">
        <h1 className="text-5xl font-bold mb-4">Welcome to SebDoesMedia</h1>
        <p className="text-xl">Master Programming, Maximize Productivity, and Discover Insightful Teachings</p>
        <p>Welcome to SebDoesMedia, your go-to resource for transformative programming projects, insightful articles on effective learning and time management, and comprehensive book reviews. Whether you're a seasoned coder or just starting your journey, SebDoesMedia is here to inspire and guide you every step of the way.</p>
      </div>
      <div className="md:w-1/3">
        <Image src={"/SebDoesMedia.png"} alt="SebDoesMedia" width={200} height={200} />
      </div>
    </div>

  )
}

export default Hero