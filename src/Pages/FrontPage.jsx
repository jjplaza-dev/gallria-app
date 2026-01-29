import React from 'react'
import HeroSection from './HeroSection'
import WhoWeAre from '../Components/WhoWeAre'
import Discover from '../Components/Discover'
import ProjectsPreview from '../Components/ProjectsPreview'

const FrontPage = () => {
  return (
    <main className='w-full h-fit bg-transparent'>
        <HeroSection />
        <WhoWeAre />
        <Discover />
        <ProjectsPreview />
        <div className='w-full h-screen bg-red-500'></div>
    </main>
  )
}

export default FrontPage