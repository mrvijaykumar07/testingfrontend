import React from 'react'
import Navbar from '../Pages/LandingPage/Navbar'
import BottomNavbar from '../Pages/LandingPage/BottomNavbar'

const Quiz = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        <h1 className="text-xl font-semibold text-black">Coming Soon..</h1>
      </div>
      <BottomNavbar />
    </div>
  )
}

export default Quiz
