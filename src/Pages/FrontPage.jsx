import React from 'react'
import HeroSection from './HeroSection'
import WhoWeAre from '../Components/WhoWeAre'

const FrontPage = () => {
  return (
    <main className='w-full h-fit bg-transparent'>
        <HeroSection />
        <WhoWeAre />
        <div className='w-full h-screen bg-red-500'></div>
    </main>
  )
}

export default FrontPage